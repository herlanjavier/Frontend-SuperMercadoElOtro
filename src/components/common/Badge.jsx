import { cn } from '../../utils/helpers.js';

export default function Badge({ children, className }) {
  return <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-black ring-1', className)}>{children}</span>;
}
