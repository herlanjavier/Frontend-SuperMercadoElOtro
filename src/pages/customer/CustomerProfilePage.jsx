import { UserRound } from 'lucide-react';
import ProfileForm from '../../components/customer/ProfileForm.jsx';
import { useProfile } from '../../hooks/useProfile.js';
import { safeText } from '../../utils/formatters.js';

export default function CustomerProfilePage() {
  const { user, profile, isSaving, updateProfile } = useProfile();

  return (
    <div className="grid gap-6">
      <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
            <UserRound className="h-7 w-7 text-yellow-300" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Mi cuenta</p>
            <h2 className="mt-1 text-3xl font-black">Mi perfil</h2>
            <p className="mt-1 text-green-50/80">{safeText(user?.email || profile?.email, 'Email no disponible')}</p>
          </div>
        </div>
      </header>

      <ProfileForm profile={profile} isSaving={isSaving} onSubmit={updateProfile} />
    </div>
  );
}
