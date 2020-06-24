import classNames from 'classnames';
import React from 'react';

interface WidgetProps {
  children?: React.ReactNode;
  className?: string;
}

export const Widget: React.FC<WidgetProps> = ({ children, className }) => (
  <div className={classNames('widget', className)}>{children}</div>
);
