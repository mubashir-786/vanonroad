'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock data - replace with actual data fetching
const mockInventory = [
  {
    id: '1',
    title: '2024 Signature Series Luxury',
    price: '£195,000',
    location: 'Yorkshire',
    berths: 6,
    status: 'Available'
  },
  {
    id: '2',
    title: '2023 Elite Range Explorer',
    price: '£175,000',
    location: 'London',
    berths: 4,
    status: 'Sold'
  },
  {
    id: '3',
    title: '2024 Urban Explorer Plus',
    price: '£120,000',
    location: 'Manchester',
    berths: 2,
    status: 'Available'
  }
];

export function InventoryList() {
  const [inventory] = useState(mockInventory);

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete item:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/add">
          <Button className="bg-amber-500 hover:bg-amber-600">
            <Plus className="mr-2 h-4 w-4" />
            Add New Vehicle
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Berths</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.berths}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/edit/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            vehicle from the inventory.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}