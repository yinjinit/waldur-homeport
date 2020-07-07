import { useRouter } from '@uirouter/react';
import classNames from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';

import { translate } from '@waldur/i18n';
import { OfferingLogo } from '@waldur/marketplace/common/OfferingLogo';
import { wrapTooltip } from '@waldur/table-react/ActionButton';

import { Offering } from '../types';

interface SingleOfferingProps {
  offering: Offering;
}

export const SingleOffering = (props: SingleOfferingProps) => {
  const router = useRouter();
  const { offering } = props;

  const gotoOffering = (uuid, category_uuid) => {
    let url = '';

    if (window.location.pathname === '/') {
      url += '/#';
    }

    url += `/organizations/${category_uuid}/marketplace-offering-details/${uuid}/`;
    window.location.href = url;
  };

  const gotoCategory = uuid => {
    router.stateService.go('marketplace-categories', { uuid });
  };

  return wrapTooltip(
    offering.state === 'Paused' && offering.paused_reason,
    <div
      className={classNames('single-offering-wrapper', {
        disabled: offering.state !== 'Active',
      })}
    >
      <div className="single-offering">
        <div className="single-offering-img">
          <OfferingLogo src={offering.thumbnail} />
        </div>
        <div className="single-offering-content">
          <h3 className="single-offering-title">{offering.name}</h3>
          <div className="single-offering-info">
            <p>
              {translate('by')} {offering.customer_name}
            </p>
            <p>
              <strong>{translate('Category')}:</strong>{' '}
              <a onClick={() => gotoCategory(offering.category_uuid)}>
                {offering.category_title}
              </a>
            </p>
          </div>
          {offering.description && (
            <div
              className="single-offering-desc"
              dangerouslySetInnerHTML={{ __html: offering.description }}
            />
          )}
        </div>
        {offering.state === 'Active' && (
          <div className="single-offering-actions">
            <Button
              onClick={() =>
                gotoOffering(offering.uuid, offering.category_uuid)
              }
              bsStyle="primary"
            >
              {translate('Install App')}
            </Button>
          </div>
        )}
      </div>
    </div>,
  );
};
