import React, { StrictMode } from 'react';
import { Grid, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';

import { translate } from '@waldur/i18n';
import { offeringsAutocomplete } from '@waldur/marketplace/common/autocompletes';
import { useTitle } from '@waldur/navigation/title';

import { AllOfferings } from '../common/AllOfferings';
import { CategoriesListType, OfferingsListType } from '../types';

import { AutocompleteField } from './AutocompleteField';
import { LandingMap } from './LandingMap';
import * as actions from './store/actions';
import * as selectors from './store/selectors';

interface MarketplacePublicProps {
  getCategories: () => void;
  getOfferings: () => void;
  gotoOffering(offeringId: string): void;
  categories: CategoriesListType;
  offerings: OfferingsListType;
}

const PureMarketplacePublic: React.FC<MarketplacePublicProps> = props => {
  useTitle(translate('Marketplace'));

  const { getCategories, getOfferings } = props;

  React.useEffect(() => {
    getCategories();
    getOfferings();
  }, [getCategories, getOfferings]);

  const mapProps = {
    offerings: props.offerings,
    categories: props.categories,
    gotoOffering: props.gotoOffering,
  };

  return (
    <div>
      <div className="search-wrapper">
        <StrictMode>
          <LandingMap {...mapProps} />
        </StrictMode>
        <AutocompleteField
          placeholder={translate('Search for apps and services')}
          loadOfferings={query =>
            offeringsAutocomplete({
              name: query,
            })
          }
          onChange={(offering: any) => actions.gotoOffering(offering.uuid)}
        />
      </div>

      <Grid>
        <PageHeader>{translate('Staff Picks')}</PageHeader>
        <AllOfferings {...props.offerings} />
      </Grid>
    </div>
  );
};

const mapDispatchToProps = {
  getCategories: actions.categoriesFetchStart,
  getOfferings: actions.offeringsFetchStart,
  gotoOffering: actions.gotoOffering,
};

const mapStateToProps = state => ({
  categories: selectors.getCategories(state),
  offerings: selectors.getOfferings(state),
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

export const MarketplacePublic = enhance(PureMarketplacePublic);
