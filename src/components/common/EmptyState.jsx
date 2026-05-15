import { PackageOpen } from 'lucide-react';
import Button from './Button.jsx';

export default function EmptyState({ title = 'Nada por aqui todavia', description, actionLabel, onAction }) {
  return (
    <div className="soft-card rounded-3xl p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
        <PackageOpen className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-black text-green-950">{title}</h3>
      {description ? <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">{description}</p> : null}
      {actionLabel ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
