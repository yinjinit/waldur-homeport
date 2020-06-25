import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { getEventsList } from '@waldur/events/BaseEventsList';
import { translate } from '@waldur/i18n';
import { User } from '@waldur/workspace/types';

interface UserEventsProps {
  showActions?: boolean;
  user: User;
}

export const UserEvents: React.FC<UserEventsProps> = outerProps =>
  outerProps.user ? (
    <Panel title={translate('Audit Logs')}>
      {getEventsList({
        mapPropsToFilter: props => ({
          scope: props.user.url,
          feature: 'users',
          exclude_extra: true,
        }),
      })(outerProps)}
    </Panel>
  ) : null;

UserEvents.defaultProps = {
  showActions: true,
};
