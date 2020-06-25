import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';

import { CustomerResourcesFilter } from './CustomerResourcesFilter';
import { CustomerResourcesList } from './CustomerResourcesList';

export const CustomerResourcesContainer = () => {
  useTitle(translate('My resources'));
  return (
    <Panel>
      <CustomerResourcesFilter />
      <CustomerResourcesList />
    </Panel>
  );
};
