import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute from '../guards/ProtectedRoute.jsx';
import RoleRoute from '../guards/RoleRoute.jsx';
import HomePage from '../pages/public/HomePage.jsx';
import LoginPage from '../pages/public/LoginPage.jsx';
import RegisterPage from '../pages/public/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/public/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../pages/public/ResetPasswordPage.jsx';
import AuthCallbackPage from '../pages/public/AuthCallbackPage.jsx';
import AccessDeniedPage from '../pages/public/AccessDeniedPage.jsx';
import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage.jsx';
import CompleteProfilePage from '../pages/customer/CompleteProfilePage.jsx';
import CatalogPage from '../pages/customer/CatalogPage.jsx';
import ProductDetailPage from '../pages/customer/ProductDetailPage.jsx';
import CartPage from '../pages/customer/CartPage.jsx';
import CheckoutPage from '../pages/customer/CheckoutPage.jsx';
import CustomerOrdersPage from '../pages/customer/CustomerOrdersPage.jsx';
import CustomerOrderDetailPage from '../pages/customer/CustomerOrderDetailPage.jsx';
import CustomerProfilePage from '../pages/customer/CustomerProfilePage.jsx';
import CustomerReceiptPage from '../pages/customer/CustomerReceiptPage.jsx';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import AdminProductsPage from '../pages/admin/AdminProductsPage.jsx';
import AdminProductFormPage from '../pages/admin/AdminProductFormPage.jsx';
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage.jsx';
import AdminSuppliersPage from '../pages/admin/AdminSuppliersPage.jsx';
import AdminSupplierFormPage from '../pages/admin/AdminSupplierFormPage.jsx';
import AdminInventoryPage from '../pages/admin/AdminInventoryPage.jsx';
import AdminInventoryEntriesPage from '../pages/admin/AdminInventoryEntriesPage.jsx';
import AdminInventoryEntryFormPage from '../pages/admin/AdminInventoryEntryFormPage.jsx';
import AdminLowStockPage from '../pages/admin/AdminLowStockPage.jsx';
import AdminNotificationsPage from '../pages/admin/AdminNotificationsPage.jsx';
import AdminReportsPage from '../pages/admin/AdminReportsPage.jsx';
import AdminUsersPage from '../pages/admin/AdminUsersPage.jsx';
import AdminUserDetailPage from '../pages/admin/AdminUserDetailPage.jsx';
import AdminCreateSalesManagerPage from '../pages/admin/AdminCreateSalesManagerPage.jsx';
import SalesReportPage from '../pages/admin/SalesReportPage.jsx';
import InventoryReportPage from '../pages/admin/InventoryReportPage.jsx';
import TopProductsReportPage from '../pages/admin/TopProductsReportPage.jsx';
import SalesByDayReportPage from '../pages/admin/SalesByDayReportPage.jsx';
import SalesDashboardPage from '../pages/sales/SalesDashboardPage.jsx';
import SalesOrdersPage from '../pages/sales/SalesOrdersPage.jsx';
import SalesOrderDetailPage from '../pages/sales/SalesOrderDetailPage.jsx';
import PendingPaymentsPage from '../pages/sales/PendingPaymentsPage.jsx';
import ConfirmedOrdersPage from '../pages/sales/ConfirmedOrdersPage.jsx';
import ReadyOrdersPage from '../pages/sales/ReadyOrdersPage.jsx';
import SalesListPage from '../pages/sales/SalesListPage.jsx';
import SalesDetailPage from '../pages/sales/SalesDetailPage.jsx';
import SalesReceiptPage from '../pages/sales/SalesReceiptPage.jsx';
import { ROLES } from '../utils/constants.js';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/access-denied', element: <AccessDeniedPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
      { path: '/auth/callback', element: <AuthCallbackPage /> },
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
              { path: '/customer', element: <CustomerDashboardPage /> },
              { path: '/customer/complete-profile', element: <CompleteProfilePage /> },
              { path: '/customer/catalog', element: <CatalogPage /> },
              { path: '/customer/products/:id', element: <ProductDetailPage /> },
              { path: '/customer/cart', element: <CartPage /> },
              { path: '/customer/checkout', element: <CheckoutPage /> },
              { path: '/customer/orders', element: <CustomerOrdersPage /> },
              { path: '/customer/orders/:id', element: <CustomerOrderDetailPage /> },
              { path: '/customer/receipts/:saleId', element: <CustomerReceiptPage /> },
              { path: '/customer/profile', element: <CustomerProfilePage /> },
            ],
          },
          {
            element: <RoleRoute roles={[ROLES.ADMIN]} />,
            children: [
              { path: '/admin', element: <AdminDashboardPage /> },
              { path: '/admin/products', element: <AdminProductsPage /> },
              { path: '/admin/products/new', element: <AdminProductFormPage /> },
              { path: '/admin/products/:id/edit', element: <AdminProductFormPage /> },
              { path: '/admin/categories', element: <AdminCategoriesPage /> },
              { path: '/admin/suppliers', element: <AdminSuppliersPage /> },
              { path: '/admin/suppliers/new', element: <AdminSupplierFormPage /> },
              { path: '/admin/suppliers/:id/edit', element: <AdminSupplierFormPage /> },
              { path: '/admin/inventory', element: <AdminInventoryPage /> },
              { path: '/admin/inventory/entries', element: <AdminInventoryEntriesPage /> },
              { path: '/admin/inventory/new-entry', element: <AdminInventoryEntryFormPage /> },
              { path: '/admin/inventory/low-stock', element: <AdminLowStockPage /> },
              { path: '/admin/notifications', element: <AdminNotificationsPage /> },
              { path: '/admin/users', element: <AdminUsersPage /> },
              { path: '/admin/users/new-sales-manager', element: <AdminCreateSalesManagerPage /> },
              { path: '/admin/users/:id', element: <AdminUserDetailPage /> },
              { path: '/admin/reports', element: <AdminReportsPage /> },
              { path: '/admin/reports/sales', element: <SalesReportPage /> },
              { path: '/admin/reports/inventory', element: <InventoryReportPage /> },
              { path: '/admin/reports/top-products', element: <TopProductsReportPage /> },
              { path: '/admin/reports/sales-by-day', element: <SalesByDayReportPage /> },
            ],
          },
          {
            element: <RoleRoute roles={[ROLES.SALES_MANAGER, ROLES.ADMIN]} />,
            children: [
              { path: '/sales', element: <SalesDashboardPage /> },
              { path: '/sales/orders', element: <SalesOrdersPage /> },
              { path: '/sales/orders/pending-payments', element: <PendingPaymentsPage /> },
              { path: '/sales/orders/confirmed', element: <ConfirmedOrdersPage /> },
              { path: '/sales/orders/ready', element: <ReadyOrdersPage /> },
              { path: '/sales/orders/:id', element: <SalesOrderDetailPage /> },
              { path: '/sales/sales', element: <SalesListPage /> },
              { path: '/sales/sales/:id', element: <SalesDetailPage /> },
              { path: '/sales/receipts/:saleId', element: <SalesReceiptPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
