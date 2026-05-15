import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, min = 1, max = 99, onChange, disabled = false }) {
  return (
    <div className="inline-flex items-center rounded-2xl bg-slate-100 p-1">
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        className="grid h-9 w-9 place-items-center rounded-xl bg-white text-green-900 disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-black text-green-950">{value}</span>
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center rounded-xl bg-green-700 text-white disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
