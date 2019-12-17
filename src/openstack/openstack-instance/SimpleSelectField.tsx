import * as React from 'react';
import Select from 'react-select';

import { FieldError } from '@waldur/form-react';

export const SimpleSelectField = props => (
  <>
    <Select
      value={props.input.value}
      onChange={props.input.onChange}
      options={props.options}
      simpleValue={true}
    />
    {props.meta.touched && <FieldError error={props.meta.error} />}
  </>
);