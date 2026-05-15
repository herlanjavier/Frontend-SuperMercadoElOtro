import { ImagePlus, Trash2 } from 'lucide-react';
import Button from '../common/Button.jsx';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 15 * 1024 * 1024;

export function validateImage(file) {
  if (!file) return '';
  if (!allowedTypes.includes(file.type)) return 'La imagen debe ser JPG, PNG o WEBP.';
  if (file.size > maxSize) return 'La imagen no debe superar 15 MB.';
  return '';
}

export default function ProductImageUploader({ file, currentImageUrl, onChange, onRemoveCurrent, error }) {
  const preview = file ? URL.createObjectURL(file) : currentImageUrl;

  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-slate-700">Imagen del producto</p>
      <label className="grid min-h-56 cursor-pointer place-items-center overflow-hidden rounded-[1.75rem] border border-dashed border-green-300 bg-green-50/60 text-center">
        {preview ? (
          <img src={preview} alt="Preview producto" className="h-full max-h-72 w-full object-cover" />
        ) : (
          <div className="p-6">
            <ImagePlus className="mx-auto h-10 w-10 text-green-700" />
            <p className="mt-2 text-sm font-bold text-green-900">Seleccionar imagen</p>
            <p className="text-xs text-slate-500">JPG, PNG o WEBP hasta 15 MB</p>
          </div>
        )}
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => onChange?.(event.target.files?.[0] || null)} />
      </label>
      {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}
      {currentImageUrl ? (
        <Button variant="secondary" icon={Trash2} className="w-full text-rose-700 sm:w-auto" onClick={onRemoveCurrent}>
          Eliminar imagen actual
        </Button>
      ) : null}
    </div>
  );
}
