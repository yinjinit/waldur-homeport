import * as React from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap/lib';

import { Action } from './types';

export interface ActionListProps {
  actions: Action[];
}

const btnStyles = ['info', 'danger', 'warning'];

export const ActionList = (props: ActionListProps) => (
  <ListGroup className="clear-list">
    {props.actions.map((action, index) => (
      <ListGroupItem key={index}>
        <Button
          onClick={action.onClick}
          bsStyle={btnStyles[index]}
          className="m-r-sm"
          bsSize="small"
        >
          <i className="fa fa-plus" />
        </Button>
        {action.title}
      </ListGroupItem>
    ))}
  </ListGroup>
);
