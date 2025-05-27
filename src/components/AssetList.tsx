
import React from 'react';
import { Asset, AssetType, SortConfig, SortKey } from '@/types';
import AssetListItem from './AssetListItem';
import AssetListControls from './AssetListControls';

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
  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-neo-text mb-4">My Portfolio Holdings</h2>
      <AssetListControls 
        sortConfig={sortConfig}
        filterType={filterType}
        onSortChange={onSortChange}
        onFilterChange={onFilterChange}
        assetTypes={availableAssetTypes}
      />
      {assets.length === 0 && filterType === 'All' ? (
        <div className="neo-card p-6 text-center">
          <p className="text-gray-500">No assets added yet. Use the form above to add your holdings.</p>
        </div>
      ) : assets.length === 0 && filterType !== 'All' ? (
        <div className="neo-card p-6 text-center">
          <p className="text-gray-500">No assets match the current filter "{filterType}".</p>
        </div>
      ) : (
        assets.map((asset) => (
          <AssetListItem key={asset.id} asset={asset} onViewDetails={onViewDetails} />
        ))
      )}
    </div>
  );
};

export default AssetList;
