
import React, { useState } from 'react';
import AssetForm from '@/components/AssetForm';
import AssetList from '@/components/AssetList';
import AssetDetailModal from '@/components/AssetDetailModal';
import PortfolioSummary from '@/components/PortfolioSummary';
import { Asset } from '@/types';
import { Wallet, TrendingUp } from 'lucide-react';

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssetForDetail, setSelectedAssetForDetail] = useState<Asset | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleAddAsset = (asset: Asset) => {
    setAssets((prevAssets) => [...prevAssets, { ...asset, id: asset.id || crypto.randomUUID() }]);
     // console.log("Asset added:", asset);
  };

  const handleViewDetails = (assetId: string) => {
    const assetToShow = assets.find(asset => asset.id === assetId);
    if (assetToShow) {
      setSelectedAssetForDetail(assetToShow);
      setIsDetailModalOpen(true);
      // console.log("Viewing details for asset:", assetToShow);
    } else {
      // console.error("Asset not found for ID:", assetId);
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg text-neo-text p-4 md:p-8 selection:bg-neo-accent selection:text-neo-bg">
      <header className="mb-12 text-center">
        <div className="inline-block border-2 border-neo-border p-4 shadow-neo-hard bg-white">
            <h1 className="text-4xl md:text-5xl font-extrabold text-neo-text flex items-center justify-center">
                <Wallet size={48} className="mr-3 text-neo-accent" strokeWidth={2.5}/> My Asset Portfolio <TrendingUp size={48} className="ml-3 text-neo-accent" strokeWidth={2.5}/>
            </h1>
        </div>
        <p className="mt-4 text-lg text-gray-700">Track your shares, bonds, and units in Tanzania.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <PortfolioSummary assets={assets} />
        <AssetForm onAddAsset={handleAddAsset} />
        <AssetList assets={assets} onViewDetails={handleViewDetails} />
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
