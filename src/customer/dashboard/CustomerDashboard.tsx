import * as React from 'react';
import { Col, Row, Grid } from 'react-bootstrap/lib';
import useAsync from 'react-use/lib/useAsync';

import { EChart } from '@waldur/core/EChart';
import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { Widget } from '@waldur/core/Widget';
import { CategoryResourcesList } from '@waldur/dashboard/CategoryResourcesList';
import { DashboardCounter } from '@waldur/dashboard/DashboardCounter';
import { isFeatureVisible } from '@waldur/features/connect';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';
import { User, Customer } from '@waldur/workspace/types';

import { loadSummary } from './api';
import { CustomerActions } from './CustomerActions';
import { CustomerResourcesList } from './CustomerResourcesList';

interface CustomerDashboardProps {
  user: User;
  customer: Customer;
}

export const CustomerDashboard = (props: CustomerDashboardProps) => {
  const { loading, value } = useAsync(() => loadSummary(props.customer), [
    props.customer,
  ]);
  const resProps = {
    title: translate('Resources'),
  };

  useTitle(translate('Dashboard'));

  return (
    <>
      <Grid fluid>
        <h1>{translate('Welcome, {user}!', { user: props.user.full_name })}</h1>
        <small>
          {translate('Overview of {organization} organization', {
            organization: props.customer.name,
          })}
        </small>
      </Grid>

      <div className="wrapper wrapper-content animated fadeInRight">
        {loading ? (
          <LoadingSpinner />
        ) : Array.isArray(value) ? (
          <Row>
            <Col md={9}>
              <Row>
                {value.map((item, index) => (
                  <Col key={index} sm={6}>
                    <Widget className="navy-bg no-padding">
                      <div className="p-m">
                        <DashboardCounter
                          label={item.chart.title}
                          value={item.chart.current}
                        />
                      </div>
                      <EChart options={item.options} height="100px" />
                    </Widget>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={3}>
              <Widget className="no-padding">
                <CustomerActions customer={props.customer} user={props.user} />
              </Widget>
            </Col>
          </Row>
        ) : null}

        <Row className="m-t-lg">
          <Col lg={12}>
            <CustomerResourcesList {...resProps} />
          </Col>
        </Row>

        {isFeatureVisible('customer.dashboard.category-resources-list') && (
          <CategoryResourcesList
            scopeType="organization"
            scope={props.customer}
          />
        )}
      </div>
    </>
  );
};
