import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';
import { angular2react } from '@waldur/shims/angular2react';

import { PaymentProfilesPanel } from '../payment-profiles/PaymentProfilesPanel';

import { CustomerActionsPanel } from './CustomerActionsPanel';
import { CustomerDetailsPanel } from './CustomerDetailsPanel';

const CustomerPoliciesPanel = angular2react('customerPoliciesPanel');

export const CustomerManage = () => {
  useTitle(translate('Manage organization'));
  return (
    <Panel>
      <CustomerDetailsPanel />
      <CustomerPoliciesPanel />
      <PaymentProfilesPanel />
      <CustomerActionsPanel />
    </Panel>
  );
};
