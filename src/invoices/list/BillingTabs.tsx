import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { ENV } from '@waldur/core/services';
import { isFeatureVisible } from '@waldur/features/connect';
import { useTitle } from '@waldur/navigation/title';
import { PayPalInvoicesList } from '@waldur/paypal/PayPalInvoicesList';

import { getTabTitle } from '../utils';

import { AgreementInfo } from './AgreementInfo';
import { BillingRecordsList } from './BillingRecordsList';
import { EstimatedCost } from './EstimatedCost';
import { InvoicesList } from './InvoicesList';

export const BillingTabs = () => {
  useTitle(getTabTitle());
  return ENV.accountingMode === 'accounting' ? (
    <Panel>
      <AgreementInfo />
      <BillingRecordsList />
    </Panel>
  ) : (
    <Panel>
      <AgreementInfo />
      <EstimatedCost />
      {isFeatureVisible('paypal') ? <PayPalInvoicesList /> : <InvoicesList />}
    </Panel>
  );
};
