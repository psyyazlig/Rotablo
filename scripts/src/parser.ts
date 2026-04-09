import * as xlsx from 'xlsx';
import { NormalizedData, Route, SideQuest, Stage } from './types';
import { parseQuestTags } from './constants';

export const parseExcelSheet = (filePath: string): NormalizedData => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // İlk sayfa ele alınır
  const worksheet = workbook.Sheets[sheetName];
  
  // Veriyi satır satır JSON dizisine dönüştür (1. satır header kabul edilir)
  const rows: any[] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const routesMap = new Map<string, Route>();
  const stages: Stage[] = [];
  const sideQuests: SideQuest[] = [];

  let currentRouteCode = 'R01'; // Fallback

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const baslikOrGun = String(row[0] || '').trim();
    const rotaEtap = String(row[1] || '').trim();
    
    // Basit bir ayrıştırma: eğer satır başı header gibi duruyorsa atla
    if (baslikOrGun === 'Gün' || baslikOrGun.toLowerCase().includes('rota')) {
      continue;
    }

    // A Sütunu: Gün numarası veya etiketi
    const isDayNumber = !isNaN(Number(baslikOrGun)) && baslikOrGun !== '';
    const dayNumber = isDayNumber ? Number(baslikOrGun) : null;
    const dayLabel = !isDayNumber && baslikOrGun !== '' ? baslikOrGun : null;

    // B Sütunu: Etap Kodu / Side Quest
    // Örn "R01--03" (Route 1, Etap 3) veya "SQ--01"
    const routeCodeMatch = rotaEtap.split('--');
    let routeCode = routeCodeMatch.length > 1 ? routeCodeMatch[0] : currentRouteCode;
    let stageSequenceStr = routeCodeMatch.length > 1 ? routeCodeMatch[1] : rotaEtap;
    
    // Eğer bir bypass/connector ise prefix BP veya CN okumaya çalış
    let routeFamily: 'main' | 'bypass' | 'connector' = 'main';
    if (routeCode.startsWith('BP')) routeFamily = 'bypass';
    else if (routeCode.startsWith('CN')) routeFamily = 'connector';

    currentRouteCode = routeCode;

    // Rota Map'inde yoksa yarat
    if (routeCode && routeCode !== '' && !rotaEtap.includes('SQ') && !baslikOrGun.includes('SQ')) {
      if (!routesMap.has(routeCode)) {
        routesMap.set(routeCode, {
          id: `route:${routeCode.toLowerCase()}`,
          code: routeCode,
          name: `Rota ${routeCode}`, // İleride zenginleştirilebilir
          family: routeFamily,
          plannedDistanceKm: 0,
          plannedStageCount: 0
        });
      }
    }

    const distanceKm = Number(row[2]) || 0;
    const lodging = String(row[3] || '').trim().toLowerCase();
    
    // G sütunu (Index 6)
    const questData = String(row[6] || '');
    const mappedTags = parseQuestTags(questData);

    // H sütunu: Zorluk -- Manzara (Index 7)
    const scores = String(row[7] || '').split('-');
    const difficultyScore = Number(scores[0]) || 0;
    const sceneryScore = Number(scores[1] || 0);

    // I sütunu: Detour (Index 8)
    const detourData = String(row[8] || '').trim();
    let detourAnchorName = null;
    let detourKm = 0;
    if (detourData && detourData !== '') {
      detourAnchorName = detourData;
      // Regex ile rakam çıkarılabilir (şimdilik basit mantık)
      const matches = detourData.match(/\d+/);
      if (matches) detourKm = Number(matches[0]);
    }

    // J sütunu: Ziyaret (Index 9)
    const visitData = String(row[9] || '').split('--');
    const primaryVisitName = visitData[0] ? visitData[0].trim() : null;
    const primaryVisitSummary = visitData[1] ? visitData[1].trim() : null;

    // K sütunu: Başarım (Index 10)
    const achievementTitle = String(row[10] || '').trim();

    // Side Quest mantığı: B sütununda SQ geçiyorsa veya G sütunu "Side Quest" ise
    const isSideQuest = rotaEtap.toUpperCase().includes('SQ') || baslikOrGun.toUpperCase().includes('SQ');

    if (isSideQuest) {
      const parentStageId = stages.length > 0 ? stages[stages.length - 1].id : `stage:${routeCode.toLowerCase()}:unknown`;
      sideQuests.push({
        id: `sq:${routeCode.toLowerCase()}:${sideQuests.length + 1}`,
        hostStageId: parentStageId,
        distanceKm,
        questTags: mappedTags
      });
    } else {
      const routeRef = routesMap.get(routeCode);
      const stageId = `stage:${routeCode.toLowerCase()}:${stageSequenceStr}`;
      
      stages.push({
        id: stageId,
        routeId: routeRef ? routeRef.id : `route:${routeCode.toLowerCase()}`,
        code: `${routeCode}-${stageSequenceStr}`,
        sequenceIndex: stages.length + 1,
        dayNumber,
        dayLabel,
        distanceKm,
        difficultyScore,
        sceneryScore,
        questTags: mappedTags,
        detourAnchorName,
        detourKm,
        primaryVisitName,
        primaryVisitSummary,
        lodgingOptions: {
          eco: lodging.includes('eco'),
          mid: lodging.includes('mid') || lodging.includes('orta'),
          luxury: lodging.includes('lux') || lodging.includes('lüks'),
        },
        achievementTitle: achievementTitle.length > 0 ? achievementTitle : null
      });

      if (routeRef) {
        routeRef.plannedDistanceKm += distanceKm;
        routeRef.plannedStageCount += 1;
      }
    }
  }

  return {
    routes: Array.from(routesMap.values()),
    stages,
    sideQuests
  };
};
