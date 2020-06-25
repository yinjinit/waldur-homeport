import * as React from 'react';
import { Row, Col } from 'react-bootstrap/lib';
import { useSelector } from 'react-redux';

import { Panel } from '@waldur/core/Panel';
import { CustomerCreatePromptContainer } from '@waldur/customer/create/CustomerCreatePromptContainer';
import { renderCustomerCreatePrompt } from '@waldur/customer/create/selectors';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';

import { CurrentUserEvents } from './CurrentUserEvents';
import { CustomerPermissions } from './CustomerPermissions';
import { ProjectPermissions } from './ProjectPermissions';

export const UserDashboard: React.FC = () => {
  useTitle(translate('User dashboard'));
  const renderPrompt = useSelector(renderCustomerCreatePrompt);

  return (
    <>
      {renderPrompt && (
        <Row>
          <Col md={12}>
            <CustomerCreatePromptContainer />
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6}>
          <Panel title={translate('Owned Organizations')}>
            <CustomerPermissions />
          </Panel>
        </Col>
        <Col md={6}>
          <Panel title={translate('Managed Projects')}>
            <ProjectPermissions />
          </Panel>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CurrentUserEvents />
        </Col>
      </Row>
    </>
  );
};
