import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { KeyRound } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import { supabase } from '../../services/supabaseAuth.service.js';
import { useAuth } from '../../hooks/useAuth.js';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { clearSession } = useAuth();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const validate = () => {
    const nextErrors = {};
    if (form.password.length < 8) nextErrors.password = 'Minimo 8 caracteres.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Las contrasenas no coinciden.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: form.password });
      if (error) throw error;

      toast.success('Contraseña actualizada. Inicia sesión nuevamente.');
      await supabase.auth.signOut().catch(() => null);
      clearSession();
      navigate('/login', { replace: true });
    } catch {
      toast.error('No pudimos actualizar tu contraseña. Abre nuevamente el enlace de recuperación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="soft-card rounded-[2rem] p-6 sm:p-8">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">Nueva contraseña</p>
      <h1 className="mt-2 text-3xl font-black text-green-950">Crea una contraseña segura</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Usa al menos 8 caracteres y confirma la misma contraseña para continuar.
      </p>

      <form className="mt-7 grid gap-4" onSubmit={submit}>
        <Input
          label="Nueva contraseña"
          type="password"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
        />
        <Button type="submit" isLoading={isLoading} icon={KeyRound} className="mt-2">
          Actualizar contraseña
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        ¿El enlace expiró?{' '}
        <Link to="/forgot-password" className="font-black text-green-700 hover:text-green-900">
          Solicita otro
        </Link>
      </p>
    </div>
  );
}
