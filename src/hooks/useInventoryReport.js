import { useCallback } from 'react';
import { reportService } from '../services/report.service.js';
import { useReportBase } from './useReportBase.js';

const initial = { categoryId: '', stockStatus: '', includeInactive: false, from: '', to: '', month: '' };

export function useInventoryReport() {
  return useReportBase(
    initial,
    useCallback((filters) => reportService.getInventoryReport(filters), []),
    useCallback((filters) => reportService.downloadInventoryReportPdf(filters), []),
    { load: 'No se pudo cargar el reporte de inventario.', download: 'No se pudo descargar el PDF de inventario.' },
  );
}
