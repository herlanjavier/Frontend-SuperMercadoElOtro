import { useState } from 'react';
import { ExternalLink, Eye, FileText, X } from 'lucide-react';
import Button from './Button.jsx';

export default function FilePreview({ url, mimeType, fileName = 'Comprobante' }) {
  const [isOpen, setIsOpen] = useState(false);
  const isImage = mimeType?.startsWith('image/');
  const isPdf = mimeType === 'application/pdf';

  if (!url) return null;

  if (isPdf) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-rose-700 ring-1 ring-slate-200">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-green-950">{fileName}</p>
            <p className="text-xs font-semibold text-slate-500">PDF</p>
          </div>
          <a href={url} target="_blank" rel="noreferrer">
            <Button variant="secondary" icon={ExternalLink}>Abrir PDF</Button>
          </a>
        </div>
      </div>
    );
  }

  if (!isImage) {
    return (
      <a href={url} target="_blank" rel="noreferrer">
        <Button variant="secondary" icon={ExternalLink}>Abrir archivo</Button>
      </a>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <img src={url} alt={fileName} className="h-48 w-full rounded-xl object-contain bg-white" />
        <Button variant="secondary" icon={Eye} className="mt-3 w-full" onClick={() => setIsOpen(true)}>
          Ver imagen
        </Button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/70 p-4 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="relative max-h-[90vh] w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-green-950 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <img src={url} alt={fileName} className="max-h-[90vh] w-full rounded-2xl object-contain bg-white p-2" />
          </div>
        </div>
      ) : null}
    </>
  );
}
