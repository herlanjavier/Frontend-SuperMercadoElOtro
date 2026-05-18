import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LockKeyhole } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { signInWithGoogle } from '../../services/supabaseAuth.service.js';
import { getDashboardPathByRole } from '../../utils/roleRedirect.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated, profile } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const validate = () => {
    const nextErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Ingresa un email valido.';
    if (form.password.length < 8) nextErrors.password = 'La contrasena debe tener al menos 8 caracteres.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const session = await login(form.email, form.password);
      toast.success('Bienvenido de nuevo');
      navigate(location.state?.from?.pathname || getDashboardPathByRole(session.profile?.role), { replace: true });
    } catch (error) {
      toast.error(error.userMessage || error.response?.data?.message || 'No pudimos iniciar sesion.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setIsGoogleLoading(false);
      toast.error(error.message || 'No pudimos redirigirte a Google.');
    }
  };

  if (isAuthenticated) {
    return <Navigate to={getDashboardPathByRole(profile?.role)} replace />;
  }

  return (
    <div className="soft-card rounded-[2rem] p-6 sm:p-8">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">Ingresar</p>
      <h1 className="mt-2 text-3xl font-black text-green-950">Continua tu compra</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Accede a tus pedidos, catalogo y perfil.</p>

      <Button
        variant="secondary"
        isLoading={isGoogleLoading}
        onClick={handleGoogleLogin}
        className="mt-7 w-full border border-slate-200"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-black text-blue-600 ring-1 ring-slate-200">G</span>
        Continuar con Google
      </Button>
      <p className="mt-2 text-center text-xs font-bold text-slate-500">Solo para clientes</p>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-black uppercase tracking-wide text-slate-400">o ingresa con email</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form className="grid gap-4" onSubmit={submit}>
        <Input
          label="Email"
          type="email"
          placeholder="cliente@email.com"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />
        <Input
          label="Contrasena"
          type="password"
          placeholder="Password123"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
        />
        <Button type="submit" isLoading={isLoading} icon={LockKeyhole} className="mt-2">
          Ingresar
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link to="/forgot-password" className="font-black text-green-700 hover:text-green-900">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>

      <p className="mt-6 text-center text-sm text-slate-600">
        No tienes cuenta?{' '}
        <Link to="/register" className="font-black text-green-700 hover:text-green-900">
          Registrate
        </Link>
      </p>
    </div>
  );
}
