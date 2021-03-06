import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';

import { OrderItemsFilter } from './OrderItemsFilter';
import { OrderItemsList } from './OrderItemsList';

export const OrderItemsContainer = () => {
  useTitle(translate('Public orders'));
  return (
    <Panel>
      <OrderItemsFilter
        showOrganizationFilter={true}
        showOfferingFilter={true}
      />
      <OrderItemsList />
    </Panel>
  );
};
