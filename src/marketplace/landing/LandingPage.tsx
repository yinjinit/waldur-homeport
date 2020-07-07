import React, { StrictMode } from 'react';
import { Option } from 'react-select';

import { ENV } from '@waldur/core/services';
import { TranslateProps, withTranslation, translate } from '@waldur/i18n';
import { OfferingGrid } from '@waldur/marketplace/common/OfferingGrid';
import {
  CategoriesListType,
  OfferingsListType,
} from '@waldur/marketplace/types';

import { AutocompleteField } from './AutocompleteField';
import { CategoriesList } from './CategoriesList';
import { HeroSection } from './HeroSection';
import { LandingMap } from './LandingMap';
import { gotoOffering } from './store/actions';

interface LandingPageProps extends TranslateProps {
  categories: CategoriesListType;
  offerings: OfferingsListType;
  loadOfferings: (query: string) => Option;
  gotoOffering: (offeringId: string) => void;
}

class PureLandingPage extends React.Component<LandingPageProps> {
  render() {
    const mapProps = {
      offerings: this.props.offerings,
      categories: this.props.categories,
      gotoOffering: gotoOffering,
    };

    return (
      <>
        <HeroSection
          title={translate('Marketplace')}
          subtitle={this.props.translate('Explore {deployment} Marketplace', {
            deployment: ENV.shortPageTitle,
          })}
          search={
            <AutocompleteField
              placeholder={this.props.translate('Search for apps and services')}
              loadOfferings={this.props.loadOfferings}
              onChange={(offering: any) =>
                this.props.gotoOffering(offering.uuid)
              }
            />
          }
        >
          <StrictMode>
            <LandingMap {...mapProps} />
          </StrictMode>
        </HeroSection>

        <CategoriesList {...this.props.categories} />
        <h2 className="m-b-md">{this.props.translate('Recent additions')}</h2>
        <OfferingGrid width={2} {...this.props.offerings} />
      </>
    );
  }
}

export const LandingPage = withTranslation(PureLandingPage);
