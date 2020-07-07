import { useRouter } from '@uirouter/react';
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';

import { translate } from '@waldur/i18n';

import { BrandName } from '../sidebar/BrandName';

export const PublicHeader = () => {
  const router = useRouter();

  return (
    <Navbar collapseOnSelect inverse className="header m-b-none">
      <Navbar.Header>
        <Navbar.Brand>
          <BrandName />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem
            eventKey={1}
            onClick={() => router.stateService.go('marketplace-public')}
          >
            {translate('Marketplace')}
          </NavItem>
          <NavItem eventKey={2} onClick={() => router.stateService.go('login')}>
            {translate('Login')}
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
