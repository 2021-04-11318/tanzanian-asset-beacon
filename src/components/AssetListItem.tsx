
import React from 'react';
import { Asset } from '@/types';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import AssetTypeIcon from './AssetTypeIcon';

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
    <div className="elegant-card p-4 md:p-6 border-2 border-gray-100 hover:border-purple-200 transition-colors" role="article" aria-label={`Asset: ${asset.name}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">{asset.name}</h3>
            <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full flex items-center gap-1">
              <AssetTypeIcon type={asset.type} size={12} />
              {asset.type}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium">Quantity</p>
              <p className="font-semibold text-gray-900" aria-label={`Quantity: ${asset.quantity.toLocaleString()}`}>
                {asset.quantity.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Current Price</p>
              <p className="font-semibold text-gray-900" aria-label={`Current price: ${asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Tanzanian Shillings`}>
                TZS {asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Total Value</p>
              <p className="font-semibold text-gray-900" aria-label={`Total value: ${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Tanzanian Shillings`}>
                TZS {totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Purchase Date</p>
              <p className="font-semibold text-gray-900">
                {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <div className="text-left sm:text-right">
            <div className="flex items-center gap-2 mb-1">
              {isPositive ? (
                <TrendingUp size={18} className="text-green-600" aria-hidden="true" />
              ) : (
                <TrendingDown size={18} className="text-red-600" aria-hidden="true" />
              )}
              <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`} 
                 aria-label={`${isPositive ? 'Gain' : 'Loss'}: ${Math.abs(gainLoss).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Tanzanian Shillings`}>
                {isPositive ? '+' : ''}TZS {gainLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
               aria-label={`Return percentage: ${returnPercentage.toFixed(2)} percent`}>
              ({returnPercentage.toFixed(2)}%)
            </p>
          </div>
          
          <Button 
            onClick={() => onViewDetails(asset.id)} 
            variant="outline"
            className="elegant-button-secondary flex items-center gap-2 w-full sm:w-auto"
            aria-label={`View details for ${asset.name}`}
          >
            <Eye size={16} aria-hidden="true" />
            <span className="sm:hidden md:inline">View Details</span>
            <span className="hidden sm:inline md:hidden">Details</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetListItem;
