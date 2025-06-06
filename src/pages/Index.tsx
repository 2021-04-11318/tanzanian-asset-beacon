
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AssetForm from '@/components/AssetForm';
import AssetList from '@/components/AssetList';
import AssetDetailModal from '@/components/AssetDetailModal';
import PortfolioSummary from '@/components/PortfolioSummary';
import { Asset, AssetType, SortConfig, SortKey } from '@/types';
import { Wallet, TrendingUp, ArrowLeft } from 'lucide-react';

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssetForDetail, setSelectedAssetForDetail] = useState<Asset | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [filterType, setFilterType] = useState<AssetType | 'All'>('All');

  const handleAddAsset = (asset: Asset) => {
    setAssets((prevAssets) => [...prevAssets, { ...asset, id: asset.id || crypto.randomUUID() }]);
  };

  const handleViewDetails = (assetId: string) => {
    const assetToShow = assets.find(asset => asset.id === assetId);
    if (assetToShow) {
      setSelectedAssetForDetail(assetToShow);
      setIsDetailModalOpen(true);
    }
  };

  const handleSortChange = (key: SortKey) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (type: AssetType | 'All') => {
    setFilterType(type);
  };

  const assetTypes: AssetType[] = useMemo(() => {
    const types = new Set(assets.map(asset => asset.type));
    return Array.from(types);
  }, [assets]);

  const processedAssets = useMemo(() => {
    let sortedAssets = [...assets];

    // Filtering
    if (filterType !== 'All') {
      sortedAssets = sortedAssets.filter(asset => asset.type === filterType);
    }

    // Sorting
    sortedAssets.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (sortConfig.key === 'totalValue') {
        valA = a.currentPrice * a.quantity;
        valB = b.currentPrice * b.quantity;
      } else if (sortConfig.key === 'returnPercentage') {
        const totalCostA = a.purchasePrice * a.quantity;
        const totalValueA = a.currentPrice * a.quantity;
        valA = totalCostA > 0 ? ((totalValueA - totalCostA) / totalCostA) * 100 : -Infinity;
        
        const totalCostB = b.purchasePrice * b.quantity;
        const totalValueB = b.currentPrice * b.quantity;
        valB = totalCostB > 0 ? ((totalValueB - totalCostB) / totalCostB) * 100 : -Infinity;
      } else if (sortConfig.key === 'purchaseDate') {
        valA = a.purchaseDate ? new Date(a.purchaseDate).getTime() : (sortConfig.direction === 'asc' ? Infinity : -Infinity);
        valB = b.purchaseDate ? new Date(b.purchaseDate).getTime() : (sortConfig.direction === 'asc' ? Infinity : -Infinity);
      } else {
        valA = a[sortConfig.key];
        valB = b[sortConfig.key];
      }
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortConfig.direction === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

    return sortedAssets;
  }, [assets, sortConfig, filterType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>
      
      {/* Hero Header */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="elegant-card inline-block p-8 border-2 border-purple-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg mr-4">
                <Wallet size={32} className="text-white" strokeWidth={2.5}/>
              </div>
              My Asset Portfolio
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg ml-4">
                <TrendingUp size={32} className="text-white" strokeWidth={2.5}/>
              </div>
            </h1>
            <p className="text-lg text-gray-600">Track your shares, bonds, and units with elegance and precision.</p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-12">
        <PortfolioSummary assets={assets} />
        <AssetForm onAddAsset={handleAddAsset} />
        <AssetList 
          assets={processedAssets} 
          onViewDetails={handleViewDetails}
          sortConfig={sortConfig}
          filterType={filterType}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          availableAssetTypes={assetTypes}
        />
      </main>

      <AssetDetailModal
        asset={selectedAssetForDetail}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      <footer className="text-center py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Crafted with excellence.</p>
      </footer>
    </div>
  );
};

export default Index;
