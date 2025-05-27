
import React from 'react';
import { Asset } from '@/types';
import { Button } from '@/components/ui/button'; // Using shadcn button

interface AssetListItemProps {
  asset: Asset;
  onViewDetails: (assetId: string) => void;
}

const AssetListItem: React.FC<AssetListItemProps> = ({ asset, onViewDetails }) => {
  const totalValue = asset.currentPrice * asset.quantity;
  const totalCost = asset.purchasePrice * asset.quantity;
  const gainLoss = totalValue - totalCost;
  const returnPercentage = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;

  return (
    <div className="neo-card p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-neo-text">{asset.name}</h3>
        <p className="text-sm text-gray-600">{asset.type}</p>
        <div className="mt-2 text-sm">
          <p>Qty: <span className="font-semibold">{asset.quantity.toLocaleString()}</span></p>
          <p>Current Price: <span className="font-semibold">TZS {asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
          <p>Total Value: <span className="font-semibold">TZS {totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
        </div>
      </div>
      <div className="text-left sm:text-right mt-2 sm:mt-0">
        <p className={`text-lg font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {gainLoss >= 0 ? '+' : ''}TZS {gainLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </p>
        <p className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ({returnPercentage.toFixed(2)}%)
        </p>
        <Button 
          onClick={() => onViewDetails(asset.id)} 
          className="neo-button-secondary mt-2 text-sm py-1 px-3"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default AssetListItem;

