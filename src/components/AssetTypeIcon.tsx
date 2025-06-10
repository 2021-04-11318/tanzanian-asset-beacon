
import React from 'react';
import { AssetType } from '@/types';
import { TrendingUp, Banknote, Building } from 'lucide-react';

interface AssetTypeIconProps {
  type: AssetType;
  size?: number;
  className?: string;
}

const AssetTypeIcon: React.FC<AssetTypeIconProps> = ({ type, size = 16, className = "" }) => {
  const iconProps = { size, className };

  switch (type) {
    case 'Share':
      return <TrendingUp {...iconProps} />;
    case 'Bond':
      return <Banknote {...iconProps} />;
    case 'Unit':
      return <Building {...iconProps} />;
    default:
      return <TrendingUp {...iconProps} />;
  }
};

export default AssetTypeIcon;
