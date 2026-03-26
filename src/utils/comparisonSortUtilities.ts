import type { RankingData } from "../types/RankingData";

/** A group of items that share the same tier position. */
export type Group = RankingData[];

export type MergeJob = {
  left: Group[];
  right: Group[];
  leftPtr: number;
  rightPtr: number;
  merged: Group[];
};

export type SortState = {
  pendingJobs: MergeJob[];
  currentJob: MergeJob | null;
  completedGroups: Group[][];
  isDone: boolean;
  comparisonsCompleted: number;
};

export function createJobs(chunks: Group[][]): {
  jobs: MergeJob[];
  passThrough: Group[][];
} {
  const jobs: MergeJob[] = [];
  const passThrough: Group[][] = [];
  for (let i = 0; i < chunks.length; i += 2) {
    if (i + 1 < chunks.length) {
      jobs.push({
        left: chunks[i],
        right: chunks[i + 1],
        leftPtr: 0,
        rightPtr: 0,
        merged: [],
      });
    } else {
      passThrough.push(chunks[i]);
    }
  }
  return { jobs, passThrough };
}

export function initSortState(items: RankingData[]): SortState {
  if (items.length <= 1) {
    return {
      pendingJobs: [],
      currentJob: null,
      completedGroups: items.length === 1 ? [[[items[0]]]] : [],
      isDone: true,
      comparisonsCompleted: 0,
    };
  }
  const chunks: Group[][] = items.map((item) => [[item]]);
  const { jobs, passThrough } = createJobs(chunks);
  return {
    currentJob: jobs[0] ?? null,
    pendingJobs: jobs.slice(1),
    completedGroups: passThrough,
    isDone: false,
    comparisonsCompleted: 0,
  };
}

export function advanceSortState(
  prev: SortState,
  choice: "left" | "right" | "same",
): SortState {
  if (!prev.currentJob) return prev;

  const comparisonsCompleted = prev.comparisonsCompleted + 1;

  const job: MergeJob = {
    left: prev.currentJob.left,
    right: prev.currentJob.right,
    leftPtr: prev.currentJob.leftPtr,
    rightPtr: prev.currentJob.rightPtr,
    merged: [...prev.currentJob.merged],
  };

  if (choice === "left") {
    job.merged.push(job.left[job.leftPtr]);
    job.leftPtr++;
  } else if (choice === "right") {
    job.merged.push(job.right[job.rightPtr]);
    job.rightPtr++;
  } else {
    job.merged.push([...job.left[job.leftPtr], ...job.right[job.rightPtr]]);
    job.leftPtr++;
    job.rightPtr++;
  }

  if (job.leftPtr >= job.left.length) {
    while (job.rightPtr < job.right.length) {
      job.merged.push(job.right[job.rightPtr]);
      job.rightPtr++;
    }
  } else if (job.rightPtr >= job.right.length) {
    while (job.leftPtr < job.left.length) {
      job.merged.push(job.left[job.leftPtr]);
      job.leftPtr++;
    }
  }

  const jobDone =
    job.leftPtr >= job.left.length && job.rightPtr >= job.right.length;

  if (!jobDone) {
    return { ...prev, currentJob: job, comparisonsCompleted };
  }

  const newCompleted = [...prev.completedGroups, job.merged];

  if (prev.pendingJobs.length > 0) {
    return {
      currentJob: prev.pendingJobs[0],
      pendingJobs: prev.pendingJobs.slice(1),
      completedGroups: newCompleted,
      isDone: false,
      comparisonsCompleted,
    };
  }

  if (newCompleted.length === 1) {
    return {
      currentJob: null,
      pendingJobs: [],
      completedGroups: newCompleted,
      isDone: true,
      comparisonsCompleted,
    };
  }

  const { jobs, passThrough } = createJobs(newCompleted);
  return {
    currentJob: jobs[0] ?? null,
    pendingJobs: jobs.slice(1),
    completedGroups: passThrough,
    isDone: false,
    comparisonsCompleted,
  };
}

/**
 * Estimates remaining comparisons from the current sort state.
 * Uses worst-case (L + R - 1) consistently: for the current round's jobs
 * and for each simulated future round, giving an upper-bound estimate.
 */
export function estimateRemainingComparisons(state: SortState): number {
  if (!state.currentJob || state.isDone) return 0;

  let estimate = 0;

  const leftRem = state.currentJob.left.length - state.currentJob.leftPtr;
  const rightRem = state.currentJob.right.length - state.currentJob.rightPtr;

  estimate += leftRem + rightRem - 1;

  for (const job of state.pendingJobs) {
    estimate += job.left.length + job.right.length - 1;
  }

  let sizes: number[] = [
    ...state.completedGroups.map((chunk) => chunk.length),
    leftRem + rightRem,
    ...state.pendingJobs.map((job) => job.left.length + job.right.length),
  ];

  while (sizes.length > 1) {
    const next: number[] = [];
    for (let i = 0; i < sizes.length; i += 2) {
      if (i + 1 < sizes.length) {
        estimate += sizes[i] + sizes[i + 1] - 1;
        next.push(sizes[i] + sizes[i + 1]);
      } else {
        next.push(sizes[i]);
      }
    }
    sizes = next;
  }

  return estimate;
}

/**
 * Distributes N sorted groups into at most `tierLetters.length` tiers.
 * When N > T, excess groups are absorbed by the bottom tiers (worst first).
 *
 * Example: N=13, T=10 → top 7 tiers get 1 group each, bottom 3 tiers get 2 groups each.
 */
export function assignTiers(
  sortedGroups: Group[],
  tierLetters: string[],
): { title: string; tier: string }[] {
  const N = sortedGroups.length;
  const T = tierLetters.length;

  if (N === 0) return [];

  if (N <= T) {
    return sortedGroups.flatMap((group, i) =>
      group.map((item) => ({ title: item.title, tier: tierLetters[i] })),
    );
  }

  // N > T: distribute across all T tiers.
  // Bottom `extra` tiers absorb one additional group each.
  const base = Math.floor(N / T);
  const extra = N % T;
  const result: { title: string; tier: string }[] = [];
  let groupIdx = 0;

  for (let tierIdx = 0; tierIdx < T; tierIdx++) {
    const isBottomTier = extra > 0 && tierIdx >= T - extra;
    const count = isBottomTier ? base + 1 : base;
    for (let j = 0; j < count; j++) {
      const group = sortedGroups[groupIdx++];
      for (const item of group) {
        result.push({ title: item.title, tier: tierLetters[tierIdx] });
      }
    }
  }

  return result;
}
