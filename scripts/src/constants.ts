export const QUEST_TAG_MAP: Record<string, string> = {
  '🏎️': 'drive',
  '🏔️': 'scenic',
  '🏛️': 'history',
  '🍽️': 'gastronomy',
  '🍷': 'wine',
  '🏖️': 'coast',
  '⚡': 'elite',
  '🌲': 'nature',
  // Olası opsiyonel string değer karsiliklari:
  'drive': 'drive',
  'scenic': 'scenic',
  'history': 'history',
  'gastronomy': 'gastronomy',
  'wine': 'wine',
  'coast': 'coast',
  'elite': 'elite',
  'nature': 'nature'
};

/**
 * Excel'deki Ham sembol girdisinde geçen tagleri kod karşılıklarına eşler
 */
export const parseQuestTags = (rawContent: string | undefined): string[] => {
  if (!rawContent) return [];
  const tags: string[] = [];
  
  // Eğer hücrede direk semboller varsa
  for (const [key, value] of Object.entries(QUEST_TAG_MAP)) {
    if (rawContent.includes(key)) {
      if (!tags.includes(value)) tags.push(value);
    }
  }

  return tags;
};
