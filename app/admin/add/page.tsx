import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { InventoryForm } from '@/components/admin/inventory-form';

export default function AddInventoryPage() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mt-12 lg:mt-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Add New <span className="text-amber-500">Inventory</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Add a new vehicle to your inventory
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <InventoryForm />
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}