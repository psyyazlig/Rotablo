export type RouteFamily = 'main' | 'bypass' | 'connector';

export interface Route {
  id: string;
  code: string;
  name: string;
  family: RouteFamily;
  plannedDistanceKm: number;
  plannedStageCount: number;
}

export interface Stage {
  id: string;
  routeId: string;
  code: string; 
  sequenceIndex: number;
  dayNumber: number | null;
  dayLabel: string | null;
  distanceKm: number;
  difficultyScore: number;
  sceneryScore: number;
  questTags: string[];
  detourAnchorName: string | null;
  detourKm: number;
  primaryVisitName: string | null;
  primaryVisitSummary: string | null;
  lodgingOptions: { eco: boolean; mid: boolean; luxury: boolean };
  achievementTitle: string | null;
}

export interface SideQuest {
  id: string;
  hostStageId: string;
  distanceKm: number;
  questTags: string[];
}

export interface NormalizedData {
  routes: Route[];
  stages: Stage[];
  sideQuests: SideQuest[];
}
