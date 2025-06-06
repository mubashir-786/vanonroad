import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminHeader } from '@/components/admin/admin-header';
import { ContactMessages } from '@/components/admin/contact-messages';

export default function AdminMessagesPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminHeader />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <ContactMessages />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}