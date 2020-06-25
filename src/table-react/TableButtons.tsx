import * as React from 'react';
import { ButtonGroup } from 'react-bootstrap';

import { TableExportButton } from './TableExportButton';
import { TableRefreshButton } from './TableRefreshButton';

export const TableButtons = props => (
  <div className="html5buttons">
    <ButtonGroup className="dt-buttons">
      {props.rows.length > 0 && props.enableExport && (
        <TableExportButton {...props} />
      )}
      {props.actions}
      <TableRefreshButton {...props} />
    </ButtonGroup>
  </div>
);
