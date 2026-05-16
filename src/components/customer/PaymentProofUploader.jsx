import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, FileUp, Image, RefreshCw } from 'lucide-react';
import Button from '../common/Button.jsx';
import FilePreview from '../common/FilePreview.jsx';
import { paymentProofService } from '../../services/payment-proof.service.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const maxSizeBytes = 10 * 1024 * 1024;

export default function PaymentProofUploader({ order, onUploaded }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [proofPreview, setProofPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const uploadedAt = order?.paymentProofUploadedAt || order?.payment_proof_uploaded_at;
  const mimeType = order?.paymentProofMimeType || order?.payment_proof_mime_type;
  const hasProof = Boolean(order?.paymentProofPath || order?.payment_proof_path);

  const fileLabel = useMemo(() => {
    if (!file) return '';
    return `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
  }, [file]);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    setFile(null);
    setPreviewUrl('');

    if (!selected) return;

    if (!allowedTypes.includes(selected.type)) {
      toast.error('El archivo debe ser imagen o PDF.');
      event.target.value = '';
      return;
    }

    if (selected.size > maxSizeBytes) {
      toast.error('El archivo no debe superar 10 MB.');
      event.target.value = '';
      return;
    }

    setFile(selected);
    if (selected.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const upload = async () => {
    if (!file) {
      toast.error('Selecciona un comprobante de pago.');
      return;
    }

    setIsUploading(true);
    try {
      await paymentProofService.uploadPaymentProof(order.id, file);
      toast.success('Comprobante cargado correctamente.');
      setFile(null);
      setPreviewUrl('');
      await onUploaded?.();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo subir el comprobante.');
    } finally {
      setIsUploading(false);
    }
  };

  const openCurrentProof = async () => {
    setIsOpening(true);
    try {
      const data = await paymentProofService.getPaymentProof(order.id);
      setProofPreview(data);
      if (data.mimeType === 'application/pdf') {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo abrir el comprobante.');
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <section className="soft-card rounded-[1.75rem] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">Comprobante</p>
          <h3 className="mt-1 text-xl font-black text-green-950">Subir comprobante de pago</h3>
        </div>
        {hasProof ? (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-800 ring-1 ring-green-200">
            Cargado
          </span>
        ) : (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-800 ring-1 ring-amber-200">
            Pendiente
          </span>
        )}
      </div>

      {hasProof ? (
        <p className="mt-3 text-sm text-slate-600">
          Ultimo comprobante: {mimeType || 'archivo'} · {formatOrderDate(uploadedAt)}
        </p>
      ) : (
        <p className="mt-3 text-sm text-slate-600">Aun no subiste comprobante. El supermercado lo revisara antes de confirmar el pago.</p>
      )}

      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-green-300 bg-green-50/60 p-5 text-center hover:bg-green-50">
        <FileUp className="h-8 w-8 text-green-700" />
        <span className="mt-2 text-sm font-black text-green-950">{hasProof ? 'Reemplazar comprobante' : 'Seleccionar comprobante'}</span>
        <span className="mt-1 text-xs font-semibold text-slate-500">JPG, PNG, WEBP o PDF · max. 10 MB</span>
        <input className="hidden" type="file" accept={allowedTypes.join(',')} onChange={handleFileChange} />
      </label>

      {file ? (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Image className="h-4 w-4 text-green-700" />
            {fileLabel}
          </p>
          {previewUrl ? <img src={previewUrl} alt="Vista previa del comprobante" className="mt-3 max-h-56 w-full rounded-xl object-contain bg-white" /> : null}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button icon={hasProof ? RefreshCw : FileUp} className="w-full sm:w-auto" isLoading={isUploading} onClick={upload}>
          {hasProof ? 'Subir reemplazo' : 'Subir comprobante'}
        </Button>
        {hasProof ? (
          <Button variant="secondary" icon={Eye} className="w-full sm:w-auto" isLoading={isOpening} onClick={openCurrentProof}>
            Ver comprobante
          </Button>
        ) : null}
      </div>

      {proofPreview?.mimeType?.startsWith('image/') ? (
        <div className="mt-4">
          <FilePreview url={proofPreview.url} mimeType={proofPreview.mimeType} fileName="Comprobante de pago" />
        </div>
      ) : null}
    </section>
  );
}
