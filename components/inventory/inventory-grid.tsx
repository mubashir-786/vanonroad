'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getInventoryItems, InventoryItem, InventoryFilters } from '@/lib/api/inventory';

interface InventoryGridProps {
  filters?: InventoryFilters;
}

export function InventoryGrid({ filters }: InventoryGridProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, [filters]);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const { items } = await getInventoryItems(filters);
      setInventory(items);
    } catch (error: any) {
      setError(error.message || 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button onClick={loadInventory} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">
          No vehicles found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {inventory.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden transition-all duration-300 h-full flex flex-col"
          onMouseEnter={() => setHoveredCard(item.id!)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative h-48 overflow-hidden">
            {item.images && item.images.length > 0 ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${item.images[0]})`,
                  transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)",
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-slate-500">No Image</span>
              </div>
            )}
            
            {item.status !== 'available' && (
              <Badge className={`absolute top-4 right-4 ${
                item.status === 'sold' 
                  ? 'bg-red-500 hover:bg-red-500' 
                  : 'bg-yellow-500 hover:bg-yellow-500'
              }`}>
                {item.status === 'sold' ? 'Sold' : 'Reserved'}
              </Badge>
            )}
          </div>

          <CardContent className="flex-grow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold font-playfair">{item.title}</h3>
                <p className="text-amber-600 font-semibold">£{item.price.toLocaleString()}</p>
              </div>
              <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Info className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Make:</span>
                <span className="font-medium capitalize">{item.make}</span>
              </div>
              <div className="flex justify-between">
                <span>Berths:</span>
                <span className="font-medium">{item.berths}</span>
              </div>
              <div className="flex justify-between">
                <span>Year:</span>
                <span className="font-medium">{item.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium">{item.location}</span>
              </div>
            </div>

            <Link href={`/inventory/${item.id}`}>
              <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-900 text-white">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}