export const RANKING_FLOW_VALUES = ["comparison", "ranking"] as const;

export type RankingFlow = (typeof RANKING_FLOW_VALUES)[number];

export function parseRankingFlowParam(param: string | null): RankingFlow {
  if (param && (RANKING_FLOW_VALUES as readonly string[]).includes(param)) {
    return param as RankingFlow;
  }
  return RANKING_FLOW_VALUES[0];
}

export const RANKING_FORMAT_VALUES = ["ordered", "tierlist"] as const;

export type RankingFormat = (typeof RANKING_FORMAT_VALUES)[number];

export function parseRankingFormatParam(param: string | null): RankingFormat {
  if (param && (RANKING_FORMAT_VALUES as readonly string[]).includes(param)) {
    return param as RankingFormat;
  }
  return RANKING_FORMAT_VALUES[0];
}
