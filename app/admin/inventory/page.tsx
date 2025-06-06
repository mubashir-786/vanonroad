import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { InventoryList } from '@/components/admin/inventory-list';

export default function AdminInventoryPage() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mt-12 lg:mt-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Inventory <span className="text-amber-500">Management</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Manage your motorhome inventory
            </p>
          </div>
          
          <InventoryList />
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}