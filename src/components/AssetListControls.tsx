
import React from 'react';
import { AssetType, SortConfig, SortKey } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, ArrowDownAz, ArrowUpAz, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

interface AssetListControlsProps {
  sortConfig: SortConfig;
  filterType: AssetType | 'All';
  onSortChange: (key: SortKey) => void;
  onFilterChange: (type: AssetType | 'All') => void;
  assetTypes: AssetType[];
}

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'name', label: 'Asset Name' },
  { value: 'totalValue', label: 'Total Value' },
  { value: 'returnPercentage', label: 'Return %' },
  { value: 'purchaseDate', label: 'Purchase Date' },
];

const AssetListControls: React.FC<AssetListControlsProps> = ({
  sortConfig,
  filterType,
  onSortChange,
  onFilterChange,
  assetTypes,
}) => {
  const handleSortKeyChange = (value: string) => {
    onSortChange(value as SortKey);
  };

  const toggleSortDirection = () => {
    // This will trigger a re-sort with the same key but opposite direction in the parent
    onSortChange(sortConfig.key); 
  };

  return (
    <div className="neo-card p-4 mb-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="sort-by" className="text-sm font-medium text-neo-text">Sort by:</label>
        <Select value={sortConfig.key} onValueChange={handleSortKeyChange}>
          <SelectTrigger id="sort-by" className="neo-input w-full sm:w-[180px]">
            <SelectValue placeholder="Select sort key" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={toggleSortDirection} variant="outline" size="icon" className="neo-button">
          {sortConfig.direction === 'asc' ? 
            (sortConfig.key === 'name' ? <ArrowUpAz size={18} /> : <ArrowUpWideNarrow size={18} />) : 
            (sortConfig.key === 'name' ? <ArrowDownAz size={18} /> : <ArrowDownWideNarrow size={18} />)}
        </Button>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="filter-by" className="text-sm font-medium text-neo-text">Filter by Type:</label>
        <Select value={filterType} onValueChange={(value) => onFilterChange(value as AssetType | 'All')}>
          <SelectTrigger id="filter-by" className="neo-input w-full sm:w-[150px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {assetTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AssetListControls;
