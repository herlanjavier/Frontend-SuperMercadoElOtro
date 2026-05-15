import { ShoppingBasket } from 'lucide-react';
import { ASSETS, APP_NAME } from '../../utils/constants.js';
import { cn } from '../../utils/helpers.js';

export default function Logo({ className, compact = false }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg shadow-green-900/15 ring-1 ring-green-900/10">
        <img
          src={ASSETS.LOGO}
          alt={APP_NAME}
          className="h-full w-full object-contain"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            event.currentTarget.nextElementSibling.style.display = 'block';
          }}
        />
        <ShoppingBasket className="hidden h-6 w-6 text-white" />
      </div>
      {!compact ? (
        <div className="leading-tight">
          <p className="text-sm font-black text-green-950">Supermercado Online</p>
          <p className="text-xs font-bold text-green-700">El Otro</p>
        </div>
      ) : null}
    </div>
  );
}
