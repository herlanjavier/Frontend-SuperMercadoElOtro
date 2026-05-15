import { Download } from 'lucide-react';
import Button from '../common/Button.jsx';

export default function ReportDownloadButton({ onClick, isLoading }) {
  return (
    <Button variant="warm" icon={Download} isLoading={isLoading} onClick={onClick} className="w-full sm:w-auto">
      Descargar PDF
    </Button>
  );
}
