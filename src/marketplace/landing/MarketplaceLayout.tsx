import { UIView } from '@uirouter/react';
import React from 'react';

import { PublicHeader } from '@waldur/navigation/header/PublicHeader';
import { PublicFooter } from '@waldur/navigation/PublicFooter';

export const MarketplaceLayout = () => {
  return (
    <div>
      <PublicHeader />
      <UIView className="mp-content"></UIView>
      <PublicFooter />
    </div>
  );
};
