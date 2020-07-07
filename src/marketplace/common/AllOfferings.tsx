import { useRouter } from '@uirouter/react';
import React from 'react';
import { Button } from 'react-bootstrap';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { translate } from '@waldur/i18n';

import { Offering } from '../types';

import { SingleOffering } from './SingleOffering';

interface OfferingsProps {
  items: Offering[];
  loaded: boolean;
  loading: boolean;
  categoryId?: string;
  hideActions?: boolean;
}

export const AllOfferings: React.FC<OfferingsProps> = props => {
  const router = useRouter();
  const { loading, loaded, items, categoryId, hideActions } = props;
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!loaded) {
    return (
      <h3 className="text-center">
        {translate('Unable to load marketplace offerings.')}
      </h3>
    );
  }

  if (!items.length) {
    return (
      <h3 className="text-center">
        {translate('There are no offerings in marketplace yet.')}
      </h3>
    );
  }

  const gotoAllCate = () => {
    router.stateService.go('marketplace-categories-all');
  };

  return (
    <div>
      <div className="offering-grid">
        {items
          .filter(
            offering => !categoryId || offering.category_uuid === categoryId,
          )
          .map((offering, index) => (
            <SingleOffering key={index} offering={offering} />
          ))}
      </div>
      {!hideActions && (
        <div className="text-center m-b-lg p-h-lg">
          <Button
            bsStyle="primary"
            onClick={() => gotoAllCate()}
            className="font-bold"
          >
            {translate('See all catogories')}
          </Button>
        </div>
      )}
    </div>
  );
};
