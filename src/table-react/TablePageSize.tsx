import * as React from 'react';
import Select from 'react-select';

import { translate } from '@waldur/i18n';

const options = [10, 25, 50, 100].map(v => ({ name: v, value: v }));

interface TablePageSizeProps {
  pageSize: number;
  updatePageSize: (value: {}) => void;
}

export const TablePageSize = (props: TablePageSizeProps) => {
  const pageSize = props.pageSize ? props.pageSize : 10;
  return (
    <div className="dataTables_length">
      <span className="m-r-sm">{translate('Show')}</span>
      <Select
        className="table-page-size"
        value={pageSize}
        labelKey="name"
        valueKey="value"
        options={options}
        clearable={false}
        onChange={value => props.updatePageSize(value)}
      />
      <span className="m-l-sm">{translate('entries')}</span>
    </div>
  );
};
