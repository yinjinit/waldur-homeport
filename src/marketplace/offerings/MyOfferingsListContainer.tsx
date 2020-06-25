import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';

import { MyOfferingsList } from './MyOfferingsList';
import { OfferingsFilter as MyOfferingsFilter } from './OfferingsFilter';

export const MyOfferingsListContainer = () => {
  useTitle(translate('My offerings'));
  return (
    <Panel>
      <MyOfferingsFilter />
      <MyOfferingsList />
    </Panel>
  );
};
