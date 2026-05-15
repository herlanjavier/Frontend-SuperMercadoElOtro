import { CheckCircle, Clock, Home, PackageCheck, XCircle } from 'lucide-react';
import { cn } from '../../utils/helpers.js';
import { getOrderStatusColor, getOrderStatusIconName, getOrderStatusLabel } from '../../utils/orderHelpers.js';

const icons = { Clock, CheckCircle, PackageCheck, Home, XCircle };

export default function OrderStatusBadge({ status, className }) {
  const Icon = icons[getOrderStatusIconName(status)] || Clock;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1',
        getOrderStatusColor(status),
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {getOrderStatusLabel(status)}
    </span>
  );
}
