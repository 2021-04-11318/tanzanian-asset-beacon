
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
        // Handle undefined dates by pushing them to the end/beginning depending on sort order
        valA = a.purchaseDate ? new Date(a.purchaseDate).getTime() : (sortConfig.direction === 'asc' ? Infinity : -Infinity);
        valB = b.purchaseDate ? new Date(b.purchaseDate).getTime() : (sortConfig.direction === 'asc' ? Infinity : -Infinity);
      } else { // 'name'
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
    <div className="min-h-screen bg-neo-bg text-neo-text p-4 md:p-8 selection:bg-neo-accent selection:text-neo-bg">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-neo-accent hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
      
      <header className="mb-12 text-center">
        <div className="inline-block border-2 border-neo-border p-4 shadow-neo-hard bg-white">
            <h1 className="text-4xl md:text-5xl font-extrabold text-neo-text flex items-center justify-center">
                <Wallet size={48} className="mr-3 text-neo-accent" strokeWidth={2.5}/> My Asset Portfolio <TrendingUp size={48} className="ml-3 text-neo-accent" strokeWidth={2.5}/>
            </h1>
        </div>
        <p className="mt-4 text-lg text-gray-700">Track your shares, bonds, and units in Tanzania.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <PortfolioSummary assets={assets} /> {/* Summary uses original assets for overall picture */}
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

      <footer className="text-center mt-12 py-6 border-t-2 border-neo-border">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} TZ Portfolio Tracker. Brutally Yours.</p>
      </footer>
    </div>
  );
};

export default Index;
