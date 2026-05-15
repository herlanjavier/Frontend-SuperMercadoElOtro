import Logo from './Logo.jsx';

export default function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-green-50">
      <div className="flex flex-col items-center gap-5">
        <Logo />
        <div className="h-2 w-44 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-green-700" />
        </div>
      </div>
    </div>
  );
}
