import * as React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap/lib';
import { useSelector } from 'react-redux';

import { translate } from '@waldur/i18n';
import { getConfig } from '@waldur/store/config';

export const PublicFooter = () => {
  const { buildId } = useSelector(getConfig);

  return (
    <Navbar componentClass="footer" inverse className="m-b-none">
      <Nav>
        <NavItem>
          {translate('Version')}: {buildId}
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="/policy/privacy/">
          {translate('Privacy Policy')}
        </NavItem>
        <NavItem eventKey={2} href="/tos/">
          {translate('Terms of Service')}
        </NavItem>
      </Nav>
    </Navbar>
  );
};
