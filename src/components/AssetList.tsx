
import React, { useState } from 'react';
import { Asset, AssetType, SortConfig, SortKey } from '@/types';
import AssetListItem from './AssetListItem';
import AssetListControls from './AssetListControls';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
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

  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Portfolio Holdings</h2>
        {assets.length > 0 && (
          <Button 
            onClick={scrollToAddForm}
            className="elegant-button-primary md:hidden"
            size="sm"
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
          
          {assets.length > 5 && (
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search assets by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="elegant-input pl-10"
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
            <Button onClick={scrollToAddForm} className="elegant-button-primary">
              <Plus size={16} className="mr-2" />
              Add Your First Asset
            </Button>
          </div>
        </div>
      ) : filteredAssets.length === 0 && searchTerm ? (
        <div className="elegant-card p-6 text-center">
          <p className="text-gray-500">
            No assets match your search for "{searchTerm}". Try a different search term.
          </p>
        </div>
      ) : filteredAssets.length === 0 && filterType !== 'All' ? (
        <div className="elegant-card p-6 text-center">
          <p className="text-gray-500">No assets match the current filter "{filterType}".</p>
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
