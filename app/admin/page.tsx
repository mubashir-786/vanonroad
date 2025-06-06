import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminHeader } from '@/components/admin/admin-header';
import { InventoryList } from '@/components/admin/inventory-list';

export default function AdminPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminHeader />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <InventoryList />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}