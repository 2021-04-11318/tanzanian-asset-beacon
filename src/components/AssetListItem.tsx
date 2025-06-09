
import React from 'react';
import { Asset } from '@/types';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface AssetListItemProps {
  asset: Asset;
  onViewDetails: (assetId: string) => void;
}

const AssetListItem: React.FC<AssetListItemProps> = ({ asset, onViewDetails }) => {
  const totalValue = asset.currentPrice * asset.quantity;
  const totalCost = asset.purchasePrice * asset.quantity;
  const gainLoss = totalValue - totalCost;
  const returnPercentage = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;
  const isPositive = gainLoss >= 0;

  return (
    <div className="elegant-card p-6 border-2 border-gray-100 hover:border-purple-200 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{asset.name}</h3>
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
              {asset.type}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Quantity</p>
              <p className="font-semibold text-gray-900">{asset.quantity.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Current Price</p>
              <p className="font-semibold text-gray-900">
                TZS {asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total Value</p>
              <p className="font-semibold text-gray-900">
                TZS {totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Purchase Date</p>
              <p className="font-semibold text-gray-900">
                {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              {isPositive ? (
                <TrendingUp size={20} className="text-green-600" />
              ) : (
                <TrendingDown size={20} className="text-red-600" />
              )}
              <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}TZS {gainLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ({returnPercentage.toFixed(2)}%)
            </p>
          </div>
          
          <Button 
            onClick={() => onViewDetails(asset.id)} 
            variant="outline"
            className="elegant-button-secondary flex items-center gap-2"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">View Details</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetListItem;
