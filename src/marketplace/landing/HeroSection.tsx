import * as React from 'react';

import './HeroSection.scss';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  search?: React.ReactNode;
  children?: React.ReactNode;
}

export const HeroSection = (props: HeroSectionProps) => (
  <div className="marketplace-hero__section">
    <div className="marketplace-hero__wrapper">
      <div className="marketplace-hero__header">
        <h1>{props.title}</h1>
        {props.subtitle && <small>{props.subtitle}</small>}
        {props.search}
      </div>
      <div className="marketplace-hero__content">{props.children}</div>
    </div>
  </div>
);
