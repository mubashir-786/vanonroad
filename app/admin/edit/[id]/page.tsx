import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { InventoryForm } from '@/components/admin/inventory-form';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

export default function EditInventoryPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-12">
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
      </main>
      <Footer />
    </>
  );
}