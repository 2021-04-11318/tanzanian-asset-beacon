
import React, { useState } from 'react';
import { Asset, AssetType, SortConfig, SortKey } from '@/types';
import AssetListItem from './AssetListItem';
import AssetListControls from './AssetListControls';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssetListProps {
  assets: Asset[];
  onViewDetails: (assetId: string) => void;
  sortConfig: SortConfig;
  filterType: AssetType | 'All';
  onSortChange: (key: SortKey) => void;
  onFilterChange: (type: AssetType | 'All') => void;
  availableAssetTypes: AssetType[];
}

const AssetList: React.FC<AssetListProps> = ({ 
  assets, 
  onViewDetails,
  sortConfig,
  filterType,
  onSortChange,
  onFilterChange,
  availableAssetTypes
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToAddForm = () => {
    const addForm = document.querySelector('form');
    if (addForm) {
      addForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Group similar assets for better organization
  const groupedAssets = filteredAssets.reduce((groups, asset) => {
    const key = `${asset.name}-${asset.type}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(asset);
    return groups;
  }, {} as Record<string, Asset[]>);

  const totalAssets = filteredAssets.length;

  return (
    <div className="space-y-4 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Portfolio Holdings</h2>
          {totalAssets > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Showing {totalAssets} asset{totalAssets !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
              {filterType !== 'All' && ` filtered by ${filterType}`}
            </p>
          )}
        </div>
        {assets.length > 0 && (
          <Button 
            onClick={scrollToAddForm}
            className="elegant-button-primary sm:hidden"
            size="sm"
            aria-label="Scroll to add asset form"
          >
            <Plus size={16} className="mr-2" />
            Add Asset
          </Button>
        )}
      </div>

      {assets.length > 0 && (
        <>
          <AssetListControls 
            sortConfig={sortConfig}
            filterType={filterType}
            onSortChange={onSortChange}
            onFilterChange={onFilterChange}
            assetTypes={availableAssetTypes}
          />
          
          {assets.length > 3 && (
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <Input
                type="text"
                placeholder="Search assets by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="elegant-input pl-10"
                aria-label="Search assets"
              />
            </div>
          )}
        </>
      )}

      {assets.length === 0 && filterType === 'All' ? (
        <div className="elegant-card p-8 text-center border-2 border-dashed border-gray-300">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Building Your Portfolio</h3>
            <p className="text-gray-600 mb-4">
              No assets yet. Add your first asset above to begin tracking your portfolio performance and get AI-powered insights.
            </p>
            <Button 
              onClick={scrollToAddForm} 
              className="elegant-button-primary"
              aria-label="Scroll to add first asset"
            >
              <Plus size={16} className="mr-2" />
              Add Your First Asset
            </Button>
          </div>
        </div>
      ) : filteredAssets.length === 0 && searchTerm ? (
        <div className="elegant-card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Search size={20} className="text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-700">No matching assets</h3>
          </div>
          <p className="text-gray-500">
            No assets match your search for "{searchTerm}". Try a different search term.
          </p>
          <Button 
            onClick={() => setSearchTerm('')}
            variant="outline"
            className="mt-3"
            size="sm"
          >
            Clear search
          </Button>
        </div>
      ) : filteredAssets.length === 0 && filterType !== 'All' ? (
        <div className="elegant-card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Filter size={20} className="text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-700">No assets in this category</h3>
          </div>
          <p className="text-gray-500">No assets match the current filter "{filterType}".</p>
          <Button 
            onClick={() => onFilterChange('All')}
            variant="outline"
            className="mt-3"
            size="sm"
          >
            View all assets
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssets.map((asset) => (
            <AssetListItem key={asset.id} asset={asset} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetList;
