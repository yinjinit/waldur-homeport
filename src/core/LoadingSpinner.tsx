import * as React from 'react';

import { react2angular } from '@waldur/shims/react2angular';

export const LoadingSpinner: React.FC = () => (
  <i className="fa fa-spinner fa-spin" />
);

export default react2angular(LoadingSpinner);
