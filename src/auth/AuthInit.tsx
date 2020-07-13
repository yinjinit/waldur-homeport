import { useRouter } from '@uirouter/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useAsync from 'react-use/lib/useAsync';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { Panel } from '@waldur/core/Panel';
import { ENV } from '@waldur/core/services';
import { CustomerCreateDialog } from '@waldur/customer/create/CustomerCreateDialog';
import { translate } from '@waldur/i18n';
import { showError, showSuccess } from '@waldur/store/coreSaga';
import { UserEditContainer } from '@waldur/user/support/UserEditContainer';
import { UsersService } from '@waldur/user/UsersService';

export const AuthInit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, value: user } = useAsync(() =>
    UsersService.getCurrentUser(),
  );

  const [org, createOrg] = useState(false);

  const onSave = React.useCallback(
    async user => {
      try {
        const response = await UsersService.update(user);
        UsersService.setCurrentUser(response.data);
        dispatch(showSuccess(translate('User has been updated.')));

        if (ENV.forceOrgCreation) {
          createOrg(true);
        } else {
          router.stateService.go('profile.details');
        }
      } catch (error) {
        dispatch(showError(translate('Unable to save user.')));
      }
    },
    [dispatch, router.stateService],
  );

  return loading ? (
    <div className="wrapper">
      <div className="row m-t-xl">
        <LoadingSpinner />
      </div>
    </div>
  ) : error ? (
    <>{translate('Unable to load user.')}</>
  ) : ENV.forceOrgCreation && !org ? (
    <div className="wrapper">
      <div className="row m-t-md m-b-sm">
        <div className="col-md-6 col-md-offset-3">
          <h2>
            {translate('Welcome to {pageTitle}!', {
              pageTitle: ENV.shortPageTitle,
            })}
          </h2>
          <p>
            {translate(
              'To get your clouds under control, please fill in your data.',
            )}
          </p>
        </div>
      </div>
      <div className="row initial-data-page">
        <div className="col-md-offset-2 col-md-8 col-lg-6 col-lg-offset-3">
          <Panel>
            <UserEditContainer user={user} onSave={onSave} initial={true} />
          </Panel>
        </div>
      </div>
    </div>
  ) : (
    <CustomerCreateDialog
      resolve={{ role: 'PROVIDER' }}
      onBack={() => createOrg(false)}
    />
  );
};
