import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { InventoryDetails } from '@/components/inventory/inventory-details';

export async function generateStaticParams() {
  // Return an array of objects with the 'id' parameter
  // This is a basic example - you would typically fetch this from your data source
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

export default function InventoryDetailsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <InventoryDetails id={params.id} />
        </div>
      </main>
      <Footer />
    </>
  );
}