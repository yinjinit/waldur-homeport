import * as React from 'react';

interface DashboardHeaderProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
}

export const DashboardHeader = (props: DashboardHeaderProps) => (
  <div className="dashboard-header">
    <h1>{props.title}</h1>
    <small>{props.subtitle}</small>
    {props.children}
  </div>
);
