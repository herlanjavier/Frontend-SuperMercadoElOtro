import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { receiptService } from '../services/receipt.service.js';

export function useReceipt(saleId) {
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReceipt = useCallback(async () => {
    if (!saleId) return;
    setIsLoading(true);
    setError('');
    try {
      setReceipt(await receiptService.getReceiptBySaleId(saleId));
    } catch (err) {
      const message = err.userMessage || 'El recibo aun no esta disponible.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [saleId]);

  useEffect(() => {
    fetchReceipt();
  }, [fetchReceipt]);

  const downloadPdf = async () => {
    try {
      await receiptService.downloadReceiptPdf(saleId, receipt);
      toast.success('PDF descargado correctamente.');
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo descargar el PDF.');
    }
  };

  return { receipt, isLoading, error, refetch: fetchReceipt, downloadPdf };
}
