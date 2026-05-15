import { cn } from '../../utils/helpers.js';

export default function PageContainer({ children, className }) {
  return <main className={cn('container-app py-8 sm:py-10', className)}>{children}</main>;
}
