import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { reset } from 'redux-form';

import { $state } from '@waldur/core/services';
import { withTranslation, translate } from '@waldur/i18n';
import { connectAngularComponent } from '@waldur/store/connect';
import { showSuccess } from '@waldur/store/coreSaga';
import { getCustomer } from '@waldur/workspace/selectors';

import * as api from './api';
import { OfferingCreateDialog } from './OfferingCreateDialog';
import { setStep } from './store/actions';
import { getStep } from './store/selectors';

const FORM_ID = 'marketplaceOfferingCreate';

const OfferingCreateController = props => (
  <OfferingCreateDialog
    loadCategories={() => api.loadCategories().then(options => ({ options }))}
    createOffering={request => {
      const {
        name,
        description,
        native_name,
        native_description,
        thumbnail,
        category,
        ...attributes } = request;
      const params = {
        name,
        description,
        thumbnail,
        native_name,
        native_description,
        category: category.url,
        customer: props.customer.url,
        attributes: JSON.stringify(attributes),
      };
      return api.createOffering(params).then(() => {
        props.dispatch(reset(FORM_ID));
        props.dispatch(setStep('Describe'));
        props.dispatch(showSuccess(translate('Offering has been created')));
        $state.go('marketplace-vendor-offerings');
      });
    }}
    gotoOfferingList={() => $state.go('marketplace-vendor-offerings')}
    {...props}
  />
);

const selector = formValueSelector(FORM_ID);

const mapStateToProps = state => ({
  customer: getCustomer(state),
  category: selector(state, 'category'),
  step: getStep(state),
});

const connector = connect(mapStateToProps, { setStep });

const enhance = compose(
  connector,
  withTranslation,
  reduxForm({
    form: FORM_ID,
    enableReinitialize: true,
    destroyOnUnmount: false,
  }),
);

const OfferingCreateContainer = enhance(OfferingCreateController);

export default connectAngularComponent(OfferingCreateContainer);
