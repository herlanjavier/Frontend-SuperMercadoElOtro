import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import { supabase } from '../../services/supabaseAuth.service.js';

const successMessage = 'Si el correo existe, recibirás un enlace para restablecer tu contraseña.';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un email valido.');
      return false;
    }

    setError('');
    return true;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setMessage('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setMessage(successMessage);
      toast.success('Revisa tu correo para continuar.');
    } catch {
      toast.error('No pudimos enviar el enlace. Intenta nuevamente en unos minutos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="soft-card rounded-[2rem] p-6 sm:p-8">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">Recuperar acceso</p>
      <h1 className="mt-2 text-3xl font-black text-green-950">Restablece tu contraseña</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Te enviaremos un enlace seguro para crear una nueva contraseña.
      </p>

      <form className="mt-7 grid gap-4" onSubmit={submit}>
        <Input
          label="Email"
          type="email"
          placeholder="cliente@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error}
        />

        {message ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold leading-6 text-green-800">
            {message}
          </div>
        ) : null}

        <Button type="submit" isLoading={isLoading} icon={Mail} className="mt-2">
          Enviar enlace de recuperación
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        ¿Recordaste tu contraseña?{' '}
        <Link to="/login" className="font-black text-green-700 hover:text-green-900">
          Inicia sesion
        </Link>
      </p>
    </div>
  );
}
