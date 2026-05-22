import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute from '../guards/ProtectedRoute.jsx';
import RoleRoute from '../guards/RoleRoute.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import { ROLES } from '../utils/constants.js';

const HomePage = lazy(() => import('../pages/public/HomePage.jsx'));
const LoginPage = lazy(() => import('../pages/public/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage.jsx'));
const ForgotPasswordPage = lazy(() => import('../pages/public/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('../pages/public/ResetPasswordPage.jsx'));
const AuthCallbackPage = lazy(() => import('../pages/public/AuthCallbackPage.jsx'));
const AccessDeniedPage = lazy(() => import('../pages/public/AccessDeniedPage.jsx'));
const CustomerDashboardPage = lazy(() => import('../pages/customer/CustomerDashboardPage.jsx'));
const CompleteProfilePage = lazy(() => import('../pages/customer/CompleteProfilePage.jsx'));
const CatalogPage = lazy(() => import('../pages/customer/CatalogPage.jsx'));
const ProductDetailPage = lazy(() => import('../pages/customer/ProductDetailPage.jsx'));
const CartPage = lazy(() => import('../pages/customer/CartPage.jsx'));
const CheckoutPage = lazy(() => import('../pages/customer/CheckoutPage.jsx'));
const CustomerOrdersPage = lazy(() => import('../pages/customer/CustomerOrdersPage.jsx'));
const CustomerOrderDetailPage = lazy(() => import('../pages/customer/CustomerOrderDetailPage.jsx'));
const CustomerProfilePage = lazy(() => import('../pages/customer/CustomerProfilePage.jsx'));
const CustomerReceiptPage = lazy(() => import('../pages/customer/CustomerReceiptPage.jsx'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage.jsx'));
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage.jsx'));
const AdminProductFormPage = lazy(() => import('../pages/admin/AdminProductFormPage.jsx'));
const AdminCategoriesPage = lazy(() => import('../pages/admin/AdminCategoriesPage.jsx'));
const AdminSuppliersPage = lazy(() => import('../pages/admin/AdminSuppliersPage.jsx'));
const AdminSupplierFormPage = lazy(() => import('../pages/admin/AdminSupplierFormPage.jsx'));
const AdminInventoryPage = lazy(() => import('../pages/admin/AdminInventoryPage.jsx'));
const AdminInventoryEntriesPage = lazy(() => import('../pages/admin/AdminInventoryEntriesPage.jsx'));
const AdminInventoryEntryFormPage = lazy(() => import('../pages/admin/AdminInventoryEntryFormPage.jsx'));
const AdminLowStockPage = lazy(() => import('../pages/admin/AdminLowStockPage.jsx'));
const AdminNotificationsPage = lazy(() => import('../pages/admin/AdminNotificationsPage.jsx'));
const AdminReportsPage = lazy(() => import('../pages/admin/AdminReportsPage.jsx'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage.jsx'));
const AdminUserDetailPage = lazy(() => import('../pages/admin/AdminUserDetailPage.jsx'));
const AdminCreateSalesManagerPage = lazy(() => import('../pages/admin/AdminCreateSalesManagerPage.jsx'));
const AdminBusinessHoursPage = lazy(() => import('../pages/admin/AdminBusinessHoursPage.jsx'));
const SalesReportPage = lazy(() => import('../pages/admin/SalesReportPage.jsx'));
const InventoryReportPage = lazy(() => import('../pages/admin/InventoryReportPage.jsx'));
const TopProductsReportPage = lazy(() => import('../pages/admin/TopProductsReportPage.jsx'));
const SalesByDayReportPage = lazy(() => import('../pages/admin/SalesByDayReportPage.jsx'));
const SalesDashboardPage = lazy(() => import('../pages/sales/SalesDashboardPage.jsx'));
const SalesOrdersPage = lazy(() => import('../pages/sales/SalesOrdersPage.jsx'));
const SalesOrderDetailPage = lazy(() => import('../pages/sales/SalesOrderDetailPage.jsx'));
const PendingPaymentsPage = lazy(() => import('../pages/sales/PendingPaymentsPage.jsx'));
const ConfirmedOrdersPage = lazy(() => import('../pages/sales/ConfirmedOrdersPage.jsx'));
const ReadyOrdersPage = lazy(() => import('../pages/sales/ReadyOrdersPage.jsx'));
const SalesListPage = lazy(() => import('../pages/sales/SalesListPage.jsx'));
const SalesDetailPage = lazy(() => import('../pages/sales/SalesDetailPage.jsx'));
const SalesReceiptPage = lazy(() => import('../pages/sales/SalesReceiptPage.jsx'));

const withSuspense = (element) => <Suspense fallback={<LoadingScreen />}>{element}</Suspense>;

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: withSuspense(<HomePage />) },
      { path: '/access-denied', element: withSuspense(<AccessDeniedPage />) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: withSuspense(<LoginPage />) },
      { path: '/register', element: withSuspense(<RegisterPage />) },
      { path: '/forgot-password', element: withSuspense(<ForgotPasswordPage />) },
      { path: '/reset-password', element: withSuspense(<ResetPasswordPage />) },
      { path: '/auth/callback', element: withSuspense(<AuthCallbackPage />) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            element: <RoleRoute roles={[ROLES.CUSTOMER]} />,
            children: [
              { path: '/customer', element: withSuspense(<CustomerDashboardPage />) },
              { path: '/customer/complete-profile', element: withSuspense(<CompleteProfilePage />) },
              { path: '/customer/catalog', element: withSuspense(<CatalogPage />) },
              { path: '/customer/products/:id', element: withSuspense(<ProductDetailPage />) },
              { path: '/customer/cart', element: withSuspense(<CartPage />) },
              { path: '/customer/checkout', element: withSuspense(<CheckoutPage />) },
              { path: '/customer/orders', element: withSuspense(<CustomerOrdersPage />) },
              { path: '/customer/orders/:id', element: withSuspense(<CustomerOrderDetailPage />) },
              { path: '/customer/receipts/:saleId', element: withSuspense(<CustomerReceiptPage />) },
              { path: '/customer/profile', element: withSuspense(<CustomerProfilePage />) },
            ],
          },
          {
            element: <RoleRoute roles={[ROLES.ADMIN]} />,
            children: [
              { path: '/admin', element: withSuspense(<AdminDashboardPage />) },
              { path: '/admin/products', element: withSuspense(<AdminProductsPage />) },
              { path: '/admin/products/new', element: withSuspense(<AdminProductFormPage />) },
              { path: '/admin/products/:id/edit', element: withSuspense(<AdminProductFormPage />) },
              { path: '/admin/categories', element: withSuspense(<AdminCategoriesPage />) },
              { path: '/admin/suppliers', element: withSuspense(<AdminSuppliersPage />) },
              { path: '/admin/suppliers/new', element: withSuspense(<AdminSupplierFormPage />) },
              { path: '/admin/suppliers/:id/edit', element: withSuspense(<AdminSupplierFormPage />) },
              { path: '/admin/inventory', element: withSuspense(<AdminInventoryPage />) },
              { path: '/admin/inventory/entries', element: withSuspense(<AdminInventoryEntriesPage />) },
              { path: '/admin/inventory/new-entry', element: withSuspense(<AdminInventoryEntryFormPage />) },
              { path: '/admin/inventory/low-stock', element: withSuspense(<AdminLowStockPage />) },
              { path: '/admin/notifications', element: withSuspense(<AdminNotificationsPage />) },
              { path: '/admin/users', element: withSuspense(<AdminUsersPage />) },
              { path: '/admin/users/new-sales-manager', element: withSuspense(<AdminCreateSalesManagerPage />) },
              { path: '/admin/users/:id', element: withSuspense(<AdminUserDetailPage />) },
              { path: '/admin/settings/business-hours', element: withSuspense(<AdminBusinessHoursPage />) },
              { path: '/admin/reports', element: withSuspense(<AdminReportsPage />) },
              { path: '/admin/reports/sales', element: withSuspense(<SalesReportPage />) },
              { path: '/admin/reports/inventory', element: withSuspense(<InventoryReportPage />) },
              { path: '/admin/reports/top-products', element: withSuspense(<TopProductsReportPage />) },
              { path: '/admin/reports/sales-by-day', element: withSuspense(<SalesByDayReportPage />) },
            ],
          },
          {
            element: <RoleRoute roles={[ROLES.SALES_MANAGER, ROLES.ADMIN]} />,
            children: [
              { path: '/sales', element: withSuspense(<SalesDashboardPage />) },
              { path: '/sales/orders', element: withSuspense(<SalesOrdersPage />) },
              { path: '/sales/orders/pending-payments', element: withSuspense(<PendingPaymentsPage />) },
              { path: '/sales/orders/confirmed', element: withSuspense(<ConfirmedOrdersPage />) },
              { path: '/sales/orders/ready', element: withSuspense(<ReadyOrdersPage />) },
              { path: '/sales/orders/:id', element: withSuspense(<SalesOrderDetailPage />) },
              { path: '/sales/sales', element: withSuspense(<SalesListPage />) },
              { path: '/sales/sales/:id', element: withSuspense(<SalesDetailPage />) },
              { path: '/sales/receipts/:saleId', element: withSuspense(<SalesReceiptPage />) },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
