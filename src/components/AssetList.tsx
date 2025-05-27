
import React from 'react';
import { Asset } from '@/types';
import AssetListItem from './AssetListItem';

interface AssetListProps {
  assets: Asset[];
  onViewDetails: (assetId: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, onViewDetails }) => {
  if (assets.length === 0) {
    return (
      <div className="neo-card p-6 text-center">
        <p className="text-gray-500">No assets added yet. Use the form above to add your holdings.</p>
      </div>
    );
  }

  // For now, just display. Sorting will be added later.
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-neo-text mb-4">My Portfolio</h2>
      {assets.map((asset) => (
        <AssetListItem key={asset.id} asset={asset} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default AssetList;

