import * as React from 'react';
import { Row, Button, Col, Modal } from 'react-bootstrap/lib';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@waldur/auth/SubmitButton';
import { Panel } from '@waldur/core/Panel';
import { ENV } from '@waldur/core/services';
import { translate } from '@waldur/i18n';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';

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
})(props =>
  ENV.forceOrgCreation ? (
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
  ) : (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      <Modal.Header>
        <Modal.Title>{translate('Create Organization')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="wizard-big wizard clearfix">
          <StepsList steps={props.steps} step={props.step} />
          <h3>{props.steps[props.step]}</h3>
          <div className="content clearfix">{props.children}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {props.step == 0 ? (
          <CloseDialogButton />
        ) : (
          <Button onClick={props.onPrev}>{translate('Previous')}</Button>
        )}
        <SubmitButton
          block={false}
          submitting={props.submitting}
          label={props.submitLabel}
        />
      </Modal.Footer>
    </form>
  ),
);
