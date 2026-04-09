# Rotablo Project Context

## Communication Style
- No fluff, no praise, no "great project" comments
- Direct, rational, and logical approach
- Critical thinking encouraged - challenge assumptions
- We're building together, not cheerleading

## Decision Making
- NEVER make assumptions
- ALWAYS ask when information is missing or ambiguous
- Produce deterministic outputs only - no guessing
- If multiple interpretations exist, present options and ask

## Workflow Rules
- DO NOT edit/create files without explicit "yap" / "do it" confirmation
- Present analysis, opinions, and recommendations first
- Wait for user approval before making changes
- Challenge feedback independently - don't auto-accept suggestions

## Project Status
- Idea phase only
- Product definition and data model exist (in docs/)
- No code, no implementation yet
- Tech stack decided: React Native, Node.js, TypeScript

## Core Concept
Rotablo is a curated driving experience platform for car enthusiasts. Not a navigation app - it's a "driving companion" that prioritizes road quality, driving pleasure, and journey experience over fastest routes.

Key differentiators:
- Curated routes with quality metadata (difficulty, scenery, road character)
- Vehicle profile-based warnings and compatibility
- Gamification (achievements, XP, progression)
- Budget simulator
- Side quests and detours
- Quest categories: drive, scenic, history, gastronomy, wine, coast, elite, nature

## Data Architecture
Three-layer model:
1. Curated content (routes, stages, side quests, achievements)
2. Derived system data (calculated scores, recommendations)
3. User/runtime data (vehicle profiles, trip plans, completions, XP)

Core entities:
- route (main/bypass/connector)
- stage (atomic driving unit)
- sideQuest (optional detours from stages)
- achievementDefinition
- hazardProfile (risk traits, not free text warnings)
- vehicleProfile
- tripPlan
- budgetScenario

## MVP Scope
IN: Route catalog, stage details, vehicle profiles, basic warnings, budget simulator, achievements, XP system, completion tracking
OUT: Turn-by-turn navigation, real-time traffic, social features, UGC routes, AI route generation

## Open Questions
1. V1 identity: route planner or active driving companion?
2. Planning UX: stage-by-stage or preset quest packages?
3. Completion: manual marking or location-based validation?
4. Vehicle profile detail level for V1?
5. Cross-border content (Georgia DLC) in V1 or Turkey-only start?
6. Achievement/XP balance: simulation-heavy or simple?

## Content Reality
Excel data exists but needs normalization:
- Route type standardization
- Stage ID cleanup
- Quest symbols → enum conversion
- Section/header rows separation
- Side quest relationship modeling
- Turkey + cross-border content normalization

Content import is product work, not just technical work.

## Vibecoding Approach
- Multiple AI models orchestrated
- You (Kiro) are the orchestrator
- Iterative refinement expected
