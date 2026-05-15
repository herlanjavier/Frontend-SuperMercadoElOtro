import { useCallback } from 'react';
import { reportService } from '../services/report.service.js';
import { useReportBase } from './useReportBase.js';

const initial = { from: '', to: '', month: '', limit: 10 };

export function useTopProductsReport() {
  return useReportBase(
    initial,
    useCallback((filters) => reportService.getTopProductsReport(filters), []),
    null,
    { load: 'No se pudo cargar el reporte de productos mas vendidos.' },
  );
}
