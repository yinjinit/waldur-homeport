import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';
import { useTitle } from '@waldur/navigation/title';

import { UserFilter } from './UserFilter';
import { UserList } from './UserList';

export const UserListView = () => {
  useTitle(translate('Users'));
  return (
    <>
      <Panel className="m-b-sm border-bottom">
        <UserFilter />
      </Panel>
      <Panel>
        <UserList />
      </Panel>
    </>
  );
};
