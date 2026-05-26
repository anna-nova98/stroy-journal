import { WorkLogWithDetails } from '@/types';
import { format } from 'date-fns';

const HEADERS = ['Дата', 'Вид работ', 'Единица', 'Объём', 'Исполнитель', 'Примечания', 'Создано'];

function formatRow(w: WorkLogWithDetails): string[] {
  return [
    format(new Date(w.workDate), 'dd.MM.yyyy'),
    w.workType.name,
    w.workType.unit,
    String(w.quantity),
    w.workerName,
    w.notes ?? '',
    format(new Date(w.createdAt), 'dd.MM.yyyy HH:mm'),
  ];
}

/** Trigger a browser file download */
function download(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Export as CSV (UTF-8 with BOM so Excel opens it correctly) */
export function exportCSV(rows: WorkLogWithDetails[]) {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [
    HEADERS.map(escape).join(';'),
    ...rows.map(w => formatRow(w).map(escape).join(';')),
  ];
  // BOM for correct Cyrillic display in Excel
  const bom = '\uFEFF';
  download(bom + lines.join('\r\n'), `journal_${today()}.csv`, 'text/csv;charset=utf-8;');
}

/** Export as Excel-compatible HTML table (opens in Excel/LibreOffice) */
export function exportExcel(rows: WorkLogWithDetails[]) {
  const th = (v: string) => `<th style="background:#1a237e;color:#fff;padding:6px 10px;border:1px solid #ccc">${v}</th>`;
  const td = (v: string) => `<td style="padding:5px 10px;border:1px solid #ddd">${v}</td>`;

  const header = `<tr>${HEADERS.map(th).join('')}</tr>`;
  const body = rows
    .map(w => `<tr>${formatRow(w).map(td).join('')}</tr>`)
    .join('');

  const html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>
<x:ExcelWorksheet><x:Name>Журнал работ</x:Name>
<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
</head>
<body>
<table>${header}${body}</table>
</body></html>`;

  download(html, `journal_${today()}.xls`, 'application/vnd.ms-excel;charset=utf-8;');
}

/** Export as formatted PDF via browser print dialog */
export function exportPDF(rows: WorkLogWithDetails[]) {
  const th = (v: string) => `<th>${v}</th>`;
  const td = (v: string) => `<td>${v}</td>`;

  const header = `<tr>${HEADERS.map(th).join('')}</tr>`;
  const body = rows
    .map((w, i) => `<tr class="${i % 2 === 0 ? '' : 'alt'}">${formatRow(w).map(td).join('')}</tr>`)
    .join('');

  const win = window.open('', '_blank');
  if (!win) return;

  win.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Журнал строительных работ</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 11px; color: #222; padding: 20px; }
    h1 { font-size: 16px; color: #1a237e; margin-bottom: 4px; }
    .subtitle { color: #666; font-size: 11px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #1a237e; color: #fff; padding: 7px 8px; text-align: left; font-size: 10px; }
    td { padding: 6px 8px; border-bottom: 1px solid #e0e0e0; font-size: 10px; }
    tr.alt td { background: #f5f7ff; }
    .footer { margin-top: 16px; font-size: 10px; color: #999; text-align: right; }
    @media print {
      body { padding: 0; }
      button { display: none; }
    }
  </style>
</head>
<body>
  <h1>📋 Журнал строительных работ</h1>
  <p class="subtitle">Экспортировано: ${format(new Date(), 'dd.MM.yyyy HH:mm')} • Записей: ${rows.length}</p>
  <table><thead>${header}</thead><tbody>${body}</tbody></table>
  <p class="footer">Строительный журнал v1.0.0</p>
  <br>
  <button onclick="window.print()" style="padding:8px 20px;background:#1a237e;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px">
    🖨️ Печать / Сохранить PDF
  </button>
</body>
</html>`);
  win.document.close();
}

function today() {
  return format(new Date(), 'yyyy-MM-dd');
}
