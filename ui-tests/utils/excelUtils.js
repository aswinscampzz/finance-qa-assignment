import * as XLSX from "xlsx";
import path from "path";

export function getExcelData(filePath, sheetName) {
  const workbook = XLSX.readFile(path.resolve(filePath));
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

