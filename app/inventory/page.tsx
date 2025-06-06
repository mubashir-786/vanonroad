'use client';

import { useState, useEffect } from 'react';
import { InventoryGrid } from '@/components/inventory/inventory-grid';
import { InventoryFilters } from '@/components/inventory/inventory-filters';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { InventoryFilters as IInventoryFilters } from '@/lib/api/inventory';
import { useSearchParams } from 'next/navigation';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<IInventoryFilters>({});

  // Initialize filters from URL parameters
  useEffect(() => {
    const initialFilters: IInventoryFilters = {};
    
    const search = searchParams.get('search');
    const make = searchParams.get('make');
    const berths = searchParams.get('berths');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const status = searchParams.get('status');
    
    if (search) initialFilters.search = search;
    if (make) initialFilters.make = make;
    if (berths) initialFilters.berths = parseInt(berths);
    if (minPrice) initialFilters.minPrice = parseInt(minPrice);
    if (maxPrice) initialFilters.maxPrice = parseInt(maxPrice);
    if (status) initialFilters.status = status;
    
    setFilters(initialFilters);
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Inventory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Luxury <span className="text-amber-500">Motorhomes</span> For Sale
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Browse our extensive collection of premium motorhomes, each crafted to deliver
              the ultimate luxury travel experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <InventoryFilters onFiltersChange={setFilters} initialFilters={filters} />
            <div className="lg:col-span-3">
              <InventoryGrid filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}