import * as React from 'react';
import * as Col from 'react-bootstrap/lib/Col';
import * as Row from 'react-bootstrap/lib/Row';

import { Panel } from '@waldur/core/Panel';

import { OfferingHeader } from './OfferingHeader';
import { OfferingTabs } from './OfferingTabs';
import { Offering } from './types';

interface OfferingSummaryProps {
  offering: Offering;
  summary?: string;
}

export const OfferingSummary: React.FC<OfferingSummaryProps> = props => (
  <div className="wrapper wrapper-content">
    <Panel>
      <Row>
        <Col lg={12}>
          <OfferingHeader offering={props.offering} summary={props.summary} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <OfferingTabs offering={props.offering} summary={props.summary} />
        </Col>
      </Row>
    </Panel>
  </div>
);
