import { useRouter } from '@uirouter/react';
import React, { StrictMode } from 'react';
import {
  Row,
  Col,
  Grid,
  PageHeader,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap/lib';
import { connect } from 'react-redux';

import { $state } from '@waldur/core/services';
import { translate } from '@waldur/i18n';
import { offeringsAutocomplete } from '@waldur/marketplace/common/autocompletes';
import { useTitle } from '@waldur/navigation/title';

import { AllOfferings } from '../common/AllOfferings';
import { CategoriesListType, OfferingsListType } from '../types';

import { AutocompleteField } from './AutocompleteField';
import { LandingMap } from './LandingMap';
import * as actions from './store/actions';
import * as selectors from './store/selectors';

interface CategoriesProps {
  getCategories: () => void;
  getOfferings: () => void;
  gotoOffering(offeringId: string): void;
  categories: CategoriesListType;
  offerings: OfferingsListType;
}

const PureMarketplaceCategories: React.FC<CategoriesProps> = props => {
  useTitle(translate('Marketplace Categories'));

  const router = useRouter();
  const { getCategories, getOfferings } = props;
  const currCate = $state.params.uuid;

  React.useEffect(() => {
    getCategories();
    getOfferings();
  }, [getCategories, getOfferings]);

  const mapProps = {
    offerings: props.offerings,
    categories: props.categories,
    gotoOffering: props.gotoOffering,
  };

  const gotoAll = () => {
    router.stateService.go('marketplace-categories-all');
  };

  const gotoCategory = uuid => {
    router.stateService.go('marketplace-categories', { uuid });
  };

  return (
    <>
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

      <Grid className="mp-solutions">
        <Row>
          <Col md={3}>
            <h3 className="sidebar-title m-b-md">
              {translate('Solution Categories')}
            </h3>
            <ListGroup className="category-list">
              <ListGroupItem onClick={() => gotoAll()} active={!currCate}>
                {translate('All Solutions')} ({props.offerings.items.length})
              </ListGroupItem>
              {props.categories.items.map((category, index) => (
                <ListGroupItem
                  key={index}
                  onClick={() => gotoCategory(category.uuid)}
                  active={currCate === category.uuid}
                >
                  {category.title} ({category.offering_count})
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={9}>
            {!currCate && <PageHeader>{translate('All Solutions')}</PageHeader>}
            {currCate &&
              props.categories.items.map((category, index) => {
                if (currCate === category.uuid) {
                  return (
                    <React.Fragment key={index}>
                      <PageHeader>{category.title}</PageHeader>
                      <p className="category-desc m-b-lg">
                        {category['description']}
                      </p>
                    </React.Fragment>
                  );
                }
              })}
            <AllOfferings
              {...props.offerings}
              categoryId={currCate}
              hideActions={true}
            />
          </Col>
        </Row>
      </Grid>
    </>
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

export const MarketplaceCategories = enhance(PureMarketplaceCategories);
