
import React from 'react';
import { Asset } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Hash } from 'lucide-react';

interface PortfolioMetricsProps {
  assets: Asset[];
}

const PortfolioMetrics: React.FC<PortfolioMetricsProps> = ({ assets }) => {
  if (assets.length === 0) {
    return null;
  }

  const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.currentPrice * asset.quantity, 0);
  const totalPortfolioCost = assets.reduce((sum, asset) => sum + asset.purchasePrice * asset.quantity, 0);
  const totalPortfolioGainLoss = totalPortfolioValue - totalPortfolioCost;
  const overallReturnPercentage = totalPortfolioCost > 0 ? (totalPortfolioGainLoss / totalPortfolioCost) * 100 : 0;
  const isPositive = totalPortfolioGainLoss >= 0;

  const uniqueAssets = new Set(assets.map(asset => asset.name)).size;

  return (
    <Card className="elegant-card mb-6 border-2 border-purple-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Wallet size={24} className="text-purple-600" />
          Portfolio Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wallet size={20} className="text-purple-600" />
              <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">
              TZS {totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isPositive ? (
                <TrendingUp size={20} className="text-green-600" />
              ) : (
                <TrendingDown size={20} className="text-red-600" />
              )}
              <h3 className="text-sm font-medium text-gray-600">Total Gain/Loss</h3>
            </div>
            <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}TZS {totalPortfolioGainLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ({overallReturnPercentage.toFixed(2)}%)
            </p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Hash size={20} className="text-blue-600" />
              <h3 className="text-sm font-medium text-gray-600">Unique Assets</h3>
            </div>
            <p className="text-lg font-bold text-gray-900">{uniqueAssets}</p>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp size={20} className="text-orange-600" />
              <h3 className="text-sm font-medium text-gray-600">Average Return</h3>
            </div>
            <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {overallReturnPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioMetrics;
