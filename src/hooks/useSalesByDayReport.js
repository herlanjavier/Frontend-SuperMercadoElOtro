import { useCallback } from 'react';
import { reportService } from '../services/report.service.js';
import { useReportBase } from './useReportBase.js';

const initial = { from: '', to: '', month: '' };

export function useSalesByDayReport() {
  return useReportBase(
    initial,
    useCallback((filters) => reportService.getSalesByDayReport(filters), []),
    null,
    { load: 'No se pudo cargar el reporte de ventas por dia.' },
  );
}
