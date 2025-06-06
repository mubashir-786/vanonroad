import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminHeader } from '@/components/admin/admin-header';
import { InventoryList } from '@/components/admin/inventory-list';

export default function AdminPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminHeader />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Admin <span className="text-amber-500">Dashboard</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Manage your motorhome inventory
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <InventoryList />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}