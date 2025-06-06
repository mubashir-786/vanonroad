import { AuthGuard } from '@/components/admin/auth-guard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { ContactMessages } from '@/components/admin/contact-messages';

export default function AdminMessagesPage() {
  return (
    <AuthGuard>
      <AdminLayout>
        <div className="mt-12 lg:mt-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Contact <span className="text-amber-500">Messages</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Manage customer inquiries and messages
            </p>
          </div>
          
          <ContactMessages />
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}