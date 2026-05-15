import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { validateReportFilters } from '../utils/reportHelpers.js';

export function useReportBase(initialFilters, fetcher, downloader, messages) {
  const [report, setReport] = useState(null);
  const [filters, setFiltersState] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const setFilters = (next) => setFiltersState((current) => ({ ...current, ...next }));

  const clearFilters = () => setFiltersState(initialFilters);

  const fetchReport = useCallback(async () => {
    const validation = validateReportFilters(filters);
    if (validation) {
      setError(validation);
      toast.error(validation);
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      setReport(await fetcher(filters));
    } catch (err) {
      const message = err.userMessage || messages.load;
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, filters, messages.load]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const downloadPdf = async () => {
    if (!downloader) return;
    const validation = validateReportFilters(filters);
    if (validation) {
      toast.error(validation);
      return;
    }
    setIsDownloading(true);
    try {
      await downloader(filters);
      toast.success('PDF descargado correctamente.');
    } catch (err) {
      toast.error(err.userMessage || messages.download || 'No se pudo descargar el PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  return { report, filters, isLoading, isDownloading, error, setFilters, fetchReport, downloadPdf, clearFilters };
}
