import * as React from 'react';

interface DashboardCounterProps {
  value: React.ReactNode;
  label: React.ReactNode;
}

export const DashboardCounter = (props: DashboardCounterProps) =>
  props.value !== undefined ? (
    <>
      <h1 className="m-xs">{props.value}</h1>
      <small>{props.label}</small>
    </>
  ) : null;
