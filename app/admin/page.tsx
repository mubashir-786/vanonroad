import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { InventoryUpload } from '@/components/admin/inventory-upload';

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Admin <span className="text-amber-500">Dashboard</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Manage your inventory listings and upload new vehicles.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <InventoryUpload />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}