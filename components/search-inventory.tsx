"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const priceRanges = [
  "Any Price",
  "£50,000 - £100,000",
  "£100,000 - £150,000",
  "£150,000 - £200,000",
  "£200,000+"
];

const types = [
  "All Types",
  "Luxury Collection",
  "Compact Range",
  "Custom Build"
];

const berths = [
  "Any Berths",
  "2 Berths",
  "3 Berths",
  "4 Berths",
  "5 Berths",
  "6+ Berths"
];

export function SearchInventory() {
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    priceRange: "Any Price",
    type: "All Types",
    berths: "Any Berths"
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search params:", searchParams);
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
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Type
            </label>
            <Select
              value={searchParams.type}
              onValueChange={(value) => setSearchParams({ ...searchParams, type: value })}
            >
              <SelectTrigger className="w-full bg-white dark:bg-slate-800">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
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
                  <SelectItem key={berth} value={berth}>
                    {berth}
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