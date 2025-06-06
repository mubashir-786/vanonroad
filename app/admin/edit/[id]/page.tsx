import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { InventoryForm } from '@/components/admin/inventory-form';

export default function EditInventoryPage({ params }: { params: { id: string } }) {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mt-12 lg:mt-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Edit <span className="text-amber-500">Inventory</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Update vehicle information
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <InventoryForm id={params.id} />
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}