import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { signInWithGoogle } from '../../services/supabaseAuth.service.js';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  ci: '',
  phone: '',
  address: '',
  addressReference: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerCustomer } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const validate = () => {
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = 'Tu nombre es requerido.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Tu apellido es requerido.';
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Ingresa un email valido.';
    if (form.password.length < 8) nextErrors.password = 'Minimo 8 caracteres.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Las contrasenas no coinciden.';
    if (form.ci !== '' && !form.ci.trim()) nextErrors.ci = 'El CI no puede estar vacio.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const { confirmPassword, ...payload } = form;
      await registerCustomer(payload);
      toast.success('Cuenta creada. Ahora inicia sesion.');
      navigate('/login');
    } catch (error) {
      toast.error(error.userMessage || error.response?.data?.message || 'No pudimos crear tu cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setIsGoogleLoading(false);
      toast.error(error.message || 'No pudimos redirigirte a Google.');
    }
  };

  return (
    <div className="soft-card rounded-[2rem] p-6 sm:p-8">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">Crear cuenta</p>
      <h1 className="mt-2 text-3xl font-black text-green-950">Compra desde casa</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Registra tus datos una vez y pide mas rapido despues.</p>

      <Button
        variant="secondary"
        isLoading={isGoogleLoading}
        onClick={handleGoogleRegister}
        className="mt-7 w-full border border-slate-200"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-black text-blue-600 ring-1 ring-slate-200">G</span>
        Registrarme con Google
      </Button>
      <p className="mt-2 text-center text-xs font-bold text-slate-500">Solo para clientes</p>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-black uppercase tracking-wide text-slate-400">o crea tu cuenta con email</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form className="grid gap-4" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre" value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
          <Input label="Apellido" value={form.lastName} onChange={update('lastName')} error={errors.lastName} />
        </div>
        <Input label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} />
        <Input label="Contrasena" type="password" value={form.password} onChange={update('password')} error={errors.password} />
        <Input
          label="Confirmar contrasena"
          type="password"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="CI" value={form.ci} onChange={update('ci')} error={errors.ci} />
          <Input label="Telefono" value={form.phone} onChange={update('phone')} />
        </div>
        <Input label="Direccion" value={form.address} onChange={update('address')} error={errors.address} />
        <Input label="Referencia" value={form.addressReference} onChange={update('addressReference')} />
        <Button type="submit" isLoading={isLoading} icon={UserPlus} className="mt-2">
          Crear cuenta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Ya tienes cuenta?{' '}
        <Link to="/login" className="font-black text-green-700 hover:text-green-900">
          Inicia sesion
        </Link>
      </p>
    </div>
  );
}
