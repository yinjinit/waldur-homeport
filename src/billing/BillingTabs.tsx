import * as React from 'react';
import PanelBody from 'react-bootstrap/lib/PanelBody';
import useEffectOnce from 'react-use/lib/useEffectOnce';

import { ngInjector, ENV } from '@waldur/core/services';
import { isFeatureVisible } from '@waldur/features/connect';
import { PayPalInvoicesList } from '@waldur/paypal/PayPalInvoicesList';

import { AgreementInfo } from './AgreementInfo';
import { BillingRecordsList } from './BillingRecordsList';
import { EstimatedCost } from './EstimatedCost';
import { InvoicesList } from './InvoicesList';

const updateBreadcrumbs = () => {
  if (!ngInjector) {
    return;
  }
  const BillingUtils = ngInjector.get('BillingUtils');
  const titleService = ngInjector.get('titleService');
  const BreadcrumbsService = ngInjector.get('BreadcrumbsService');
  titleService.setTitle(BillingUtils.getPageTitle());
  BreadcrumbsService.activeItem = BillingUtils.getTabTitle();
};

export const BillingTabs = () => {
  useEffectOnce(updateBreadcrumbs);
  return ENV.accountingMode === 'accounting' ? (
    <PanelBody>
      <AgreementInfo />
      <BillingRecordsList />
    </PanelBody>
  ) : (
    <PanelBody>
      <EstimatedCost />
      {isFeatureVisible('paypal') ? <PayPalInvoicesList /> : <InvoicesList />}
    </PanelBody>
  );
};