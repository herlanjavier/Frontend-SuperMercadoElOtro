import { useCallback } from 'react';
import { reportService } from '../services/report.service.js';
import { useReportBase } from './useReportBase.js';

const initial = { date: '', from: '', to: '', month: '', customerId: '', soldBy: '' };

export function useSalesReport() {
  return useReportBase(
    initial,
    useCallback((filters) => reportService.getSalesReport(filters), []),
    useCallback((filters) => reportService.downloadSalesReportPdf(filters), []),
    { load: 'No se pudo cargar el reporte de ventas.', download: 'No se pudo descargar el PDF de ventas.' },
  );
}
