import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { salesService } from '../services/sales.service.js';

export function useSaleDetail(saleId, { loadSale = true, loadReceipt = true } = {}) {
  const [sale, setSale] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetail = useCallback(async () => {
    if (!saleId) return;
    setIsLoading(true);
    setError('');
    try {
      const [saleData, receiptData] = await Promise.all([
        loadSale ? salesService.getSaleById(saleId) : Promise.resolve(null),
        loadReceipt ? salesService.getReceiptBySaleId(saleId) : Promise.resolve(null),
      ]);
      setSale(saleData);
      setReceipt(receiptData);
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar la venta.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [loadReceipt, loadSale, saleId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const downloadPdf = async () => {
    try {
      await salesService.downloadReceiptPdf(saleId, receipt || sale);
      toast.success('Recibo descargado correctamente.');
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo descargar el recibo.');
    }
  };

  return { sale, receipt, isLoading, error, refetch: fetchDetail, downloadPdf };
}
