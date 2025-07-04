"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { getMakes, Make } from "@/lib/api/makes";

const priceRanges = [
  { label: "Any Price", value: "all" },
  { label: "£50,000 - £100,000", value: "50000-100000" },
  { label: "£100,000 - £150,000", value: "100000-150000" },
  { label: "£150,000 - £200,000", value: "150000-200000" },
  { label: "£200,000+", value: "200000-999999" }
];

const berths = [
  { label: "Any Berths", value: "all" },
  { label: "2 Berths", value: "2" },
  { label: "3 Berths", value: "3" },
  { label: "4 Berths", value: "4" },
  { label: "5 Berths", value: "5" },
  { label: "6+ Berths", value: "6" }
];

export function SearchInventory() {
  const router = useRouter();
  const [makes, setMakes] = useState<Make[]>([]);
  const [makesLoading, setMakesLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    priceRange: "all",
    make: "all",
    berths: "all"
  });

  useEffect(() => {
    loadMakes();
  }, []);

  const loadMakes = async () => {
    try {
      setMakesLoading(true);
      const makesList = await getMakes();
      setMakes(makesList);
    } catch (error) {
      console.error('Error loading makes:', error);
    } finally {
      setMakesLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchParams.keyword) {
      params.set('search', searchParams.keyword);
    }
    
    if (searchParams.make && searchParams.make !== "all") {
      params.set('make', searchParams.make);
    }
    
    if (searchParams.berths && searchParams.berths !== "all") {
      params.set('berths', searchParams.berths);
    }
    
    if (searchParams.priceRange && searchParams.priceRange !== "all") {
      const [min, max] = searchParams.priceRange.split('-');
      if (min) params.set('minPrice', min);
      if (max) params.set('maxPrice', max);
    }
    
    // Navigate to inventory page with search parameters
    const queryString = params.toString();
    router.push(`/inventory${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-2xl p-8">
      <form onSubmit={handleSearch}>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Search
            </label>
            <Input
              type="text"
              placeholder="Search by keyword..."
              value={searchParams.keyword}
              onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              className="w-full bg-white dark:bg-slate-800"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Price Range
            </label>
            <Select
              value={searchParams.priceRange}
              onValueChange={(value) => setSearchParams({ ...searchParams, priceRange: value })}
            >
              <SelectTrigger className="w-full bg-white dark:bg-slate-800">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Make
            </label>
            <Select
              value={searchParams.make}
              onValueChange={(value) => setSearchParams({ ...searchParams, make: value })}
            >
              <SelectTrigger className="w-full bg-white dark:bg-slate-800">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {makesLoading ? (
                  <SelectItem value="loading-makes" disabled>Loading makes...</SelectItem>
                ) : (
                  makes.map((make) => (
                    <SelectItem key={make.id} value={make.name}>
                      {make.displayName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Berths
            </label>
            <Select
              value={searchParams.berths}
              onValueChange={(value) => setSearchParams({ ...searchParams, berths: value })}
            >
              <SelectTrigger className="w-full bg-white dark:bg-slate-800">
                <SelectValue placeholder="Berths" />
              </SelectTrigger>
              <SelectContent>
                {berths.map((berth) => (
                  <SelectItem key={berth.value} value={berth.value}>
                    {berth.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-medium px-8"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Inventory
          </Button>
        </div>
      </form>
    </div>
  );
}