import * as React from 'react';
import { useDispatch } from 'react-redux';

import { showEventDetails } from './actions';

export const EventDetailsButton = ({ row }) => {
  const dispatch = useDispatch();
  return (
    <a onClick={() => dispatch(showEventDetails(row))}>
      <i className="fa fa-eye text-navy" />
    </a>
  );
};
