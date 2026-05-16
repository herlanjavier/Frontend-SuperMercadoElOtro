import { useState } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle, Eye, FileCheck } from 'lucide-react';
import Button from './Button.jsx';
import FilePreview from './FilePreview.jsx';
import { paymentProofService } from '../../services/payment-proof.service.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';

export default function PaymentProofViewer({ order }) {
  const [proof, setProof] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasProof = Boolean(order?.paymentProofPath || order?.payment_proof_path);
  const uploadedAt = order?.paymentProofUploadedAt || order?.payment_proof_uploaded_at;

  const openProof = async () => {
    if (!hasProof) {
      toast.error('El cliente aun no subio comprobante.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await paymentProofService.getPaymentProof(order.id);
      setProof(data);
      if (data.mimeType === 'application/pdf') {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo abrir el comprobante.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasProof) {
    return (
      <section className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-5 text-amber-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5" />
          <div>
            <h3 className="font-black">Comprobante de pago</h3>
            <p className="mt-1 text-sm">El cliente aun no subio comprobante.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="soft-card rounded-[1.75rem] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">Comprobante de pago</p>
          <h3 className="mt-1 text-xl font-black text-green-950">Archivo cargado</h3>
          <p className="mt-2 text-sm text-slate-600">Fecha de carga: {formatOrderDate(uploadedAt)}</p>
        </div>
        <Button icon={proof?.mimeType === 'application/pdf' ? FileCheck : Eye} isLoading={isLoading} onClick={openProof}>
          Ver comprobante
        </Button>
      </div>

      {proof?.mimeType?.startsWith('image/') ? (
        <div className="mt-4">
          <FilePreview url={proof.url} mimeType={proof.mimeType} fileName="Comprobante de pago" />
        </div>
      ) : null}
    </section>
  );
}
