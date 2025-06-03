import { InventoryGrid } from '@/components/inventory/inventory-grid';
import { InventoryFilters } from '@/components/inventory/inventory-filters';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function InventoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Luxury <span className="text-amber-500">Motorhomes</span> For Sale
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Browse our extensive collection of premium motorhomes, each crafted to deliver
              the ultimate luxury travel experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <InventoryFilters />
            <div className="lg:col-span-3">
              <InventoryGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}