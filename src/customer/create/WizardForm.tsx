import * as React from 'react';
import { Row, Button, Col } from 'react-bootstrap/lib';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@waldur/auth/SubmitButton';
import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';

import { StepsList } from './StepsList';

interface WizardFormProps {
  onSubmit(): void;
  submitting?: boolean;
  submitLabel: string;
  steps: string[];
  step: number;
  onPrev(): void;
}

export const WizardForm = reduxForm<{}, WizardFormProps>({
  form: 'CustomerCreateDialog',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(props => (
  <div className="wrapper">
    <Row className="m-t-md">
      <Col md={8} mdOffset={2} lg={6} lgOffset={3}>
        <h2>{translate('Create Organization')}</h2>
        <StepsList steps={props.steps} step={props.step} />
        <Panel title={props.steps[props.step]}>
          <form onSubmit={props.handleSubmit(props.onSubmit)}>
            {props.children}
            <hr />
            <Button onClick={props.onPrev}>{translate('Previous')}</Button>
            <SubmitButton
              block={false}
              submitting={props.submitting}
              label={props.submitLabel}
              className="m-l-sm"
            />
          </form>
        </Panel>
      </Col>
    </Row>
  </div>
));
