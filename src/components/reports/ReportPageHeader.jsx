import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import ReportDownloadButton from './ReportDownloadButton.jsx';

export default function ReportPageHeader({ title, subtitle, onDownload, isDownloading }) {
  return (
    <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
      <Link to="/admin/reports">
        <Button variant="ghost" icon={ArrowLeft} className="mb-5 bg-white/10 text-white hover:bg-white/15">Reportes</Button>
      </Link>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Reportes administrativos</p>
          <h2 className="mt-2 text-3xl font-black">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-green-50/80">{subtitle}</p> : null}
        </div>
        {onDownload ? <ReportDownloadButton onClick={onDownload} isLoading={isDownloading} /> : null}
      </div>
    </header>
  );
}
