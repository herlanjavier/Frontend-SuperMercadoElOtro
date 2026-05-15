import { AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import { authService } from '../../services/auth.service.js';
import { supabase } from '../../services/supabaseAuth.service.js';
import { useAuthStore } from '../../store/auth.store.js';
import { ROLES } from '../../utils/constants.js';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const setExternalSession = useAuthStore((state) => state.setExternalSession);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [error, setError] = useState('');
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return undefined;
    hasRun.current = true;

    let active = true;

    const finishGoogleLogin = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const session = data.session;
        if (!session?.access_token) {
          throw new Error('No se encontro una sesion valida de Google.');
        }

        setExternalSession({
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
        });

        const me = await authService.getCurrentUser();
        const profile = me.profile;

        if (!profile) {
          throw new Error('No se encontro el perfil del usuario.');
        }

        const role = profile.role;
        const isActive = profile.isActive ?? profile.is_active;
        const profileCompleted = profile.profileCompleted ?? profile.profile_completed;

        if (role !== ROLES.CUSTOMER) {
          await supabase.auth.signOut().catch(() => null);
          clearSession();
          throw new Error('Este acceso con Google solo esta disponible para clientes.');
        }

        if (isActive === false) {
          await supabase.auth.signOut().catch(() => null);
          clearSession();
          throw new Error('Tu cuenta esta desactivada.');
        }

        setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          user: me.user,
          profile,
        });

        navigate(profileCompleted === false ? '/customer/complete-profile' : '/customer', { replace: true });
      } catch (err) {
        if (!active) return;
        await supabase.auth.signOut().catch(() => null);
        clearSession();
        setError(err.userMessage || err.message || 'No pudimos completar el inicio de sesion con Google.');
      }
    };

    finishGoogleLogin();

    return () => {
      active = false;
    };
  }, [clearSession, navigate, setExternalSession, setSession]);

  if (error) {
    return (
      <div className="soft-card rounded-[2rem] p-6 text-center sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-700">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-black text-green-950">No se pudo iniciar sesion</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>
        <Link to="/login" className="mt-6 inline-flex">
          <Button>Volver a login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="soft-card rounded-[2rem] p-8 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-green-50 text-green-700">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
      <h1 className="mt-5 text-2xl font-black text-green-950">Validando tu cuenta</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Estamos confirmando tu sesion con Google y preparando tu perfil.</p>
    </div>
  );
}
