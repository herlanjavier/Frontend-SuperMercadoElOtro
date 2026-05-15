import clsx from 'clsx';
import { getDashboardPathByRole } from './roleRedirect.js';

export const cn = (...classes) => clsx(classes);

export const formatMoney = (value) => `Bs ${Number(value || 0).toFixed(2)}`;

export const getRoleHome = getDashboardPathByRole;

export const getProfileName = (profile) =>
  [profile?.firstName ?? profile?.first_name, profile?.lastName ?? profile?.last_name].filter(Boolean).join(' ') ||
  'Usuario';
