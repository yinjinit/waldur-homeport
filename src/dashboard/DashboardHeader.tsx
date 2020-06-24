import * as React from 'react';
import { Grid } from 'react-bootstrap/lib';

interface DashboardHeaderProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
}

export const DashboardHeader = (props: DashboardHeaderProps) => (
  <Grid fluid className="border-bottom white-bg dashboard-header">
    <h2>{props.title}</h2>
    <small>{props.subtitle}</small>
    {props.children}
  </Grid>
);
