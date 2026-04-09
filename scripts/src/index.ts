import * as path from 'path';
import * as fs from 'fs';
import { parseExcelSheet } from './parser';

const runETL = () => {
  console.log("=== ROTABLO ETL PROCESS STARTED ===");
  
  // Ana tablo Excelini bulmaya çalış
  // Bir üst klasördeki (Desktop/Furkan gemini/) dosyayı okur
  const excelPaths = [
    path.join(__dirname, '../../ROTABLO - ANA TABLO.xlsx'),
    path.join(__dirname, '../../ROTABLO - ANA TABLO-1.xlsx')
  ];

  let targetExcel = '';
  for (const ep of excelPaths) {
    if (fs.existsSync(ep)) {
      targetExcel = ep;
      break;
    }
  }

  if (!targetExcel) {
    console.error("HATA: Excel dosyası bulunamadı. Lütfen ROTABLO - ANA TABLO.xlsx dosyasının bir üst dizinde (--rotablo-etl klasörünün dışı--) olduğundan emin olunuz.");
    process.exit(1);
  }

  console.log(`Veriler okunuyor: ${targetExcel}`);

  try {
    const data = parseExcelSheet(targetExcel);
    console.log(`\nBAŞARILI:`);
    console.log(`- ${data.routes.length} Ana/Bypass Rota çıkarıldı.`);
    console.log(`- ${data.stages.length} Etap çıkarıldı.`);
    console.log(`- ${data.sideQuests.length} Side Quest tespit edildi.`);

    const outputFilePath = path.join(__dirname, '../rotablo_normalized_data.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
    
    console.log(`\nVeriniz normalize edilerek JSON formatında buraya kaydedildi: \n => ${outputFilePath}`);

  } catch (error) {
    console.error("Excel işlenirken HATA oluştu: \n", error);
  }
}

runETL();
