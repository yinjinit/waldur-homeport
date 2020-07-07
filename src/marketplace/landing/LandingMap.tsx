import L from 'leaflet';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import { FormattedHtml } from '@waldur/core/FormattedHtml';
import { ngInjector } from '@waldur/core/services';
import { translate } from '@waldur/i18n';

import * as actions from './store/actions';

type Position = [number, number];

type Props = {
  content: string;
  position: Position;
  onClick: (uuid: any) => void;
  iconUrl?: string;
};

type MarkerData = {
  key: string;
  content: string;
  position: Position;
};

type State = {
  lat: number;
  lng: number;
  zoom: number;
  bounds: Array<[number, number]>;
  markers: Array<MarkerData>;
};

const PopupMarker = ({ content, position, onClick, iconUrl }: Props) => {
  const icon = L.icon({
    iconUrl: iconUrl ? iconUrl : 'images/marker-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 39],
    popupAnchor: [0, -35],
    shadowUrl: 'images/marker-shadow.png',
    shadowSize: [80, 80],
    shadowAnchor: [25, 80],
  });

  const getSections = () => {
    const rows = [];

    content['sections'].forEach((section, i) => {
      rows.push(
        <tr key={i}>
          <th>{section.title}</th>
          <td>{section.value}</td>
        </tr>,
      );
    });

    return rows;
  };

  const handleClick = () => {
    const authService = ngInjector.get('authService');

    if (authService.isAuthenticated()) {
      onClick(content['uuid']);
    } else {
      let url = '';

      if (window.location.pathname === '/') {
        url += '/#';
      }

      url += `/organizations/${content['cate_id']}/marketplace-offering-details/${content['uuid']}/`;
      window.location.href = url;
    }
  };

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <table className="marker-popup">
          <tbody>
            <tr>
              <th>{translate('Name')}: </th>
              <td>{content['name']}</td>
            </tr>
            <tr>
              <th>{translate('Category')}: </th>
              <td>{content['category']}</td>
            </tr>
            {/* <tr>
              <th>{translate('Address')}: </th>
              <td>{content['address']}</td>
            </tr> */}
            {getSections()}
            <tr>
              <td colSpan={2}>
                <Button
                  bsSize="small"
                  bsStyle="primary"
                  onClick={() => handleClick()}
                >
                  {translate('Go To Offering')}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Popup>
    </Marker>
  );
};

const MarkersList = ({
  markers,
  gotoOffering,
}: {
  markers: Array<MarkerData>;
  gotoOffering: (id: any) => void;
}) => {
  const items = markers.map(({ key, ...props }) => (
    <PopupMarker key={key} onClick={gotoOffering} {...props} />
  ));

  return <>{items}</>;
};

const esriGeocoder = () => import('esri-leaflet-geocoder');

interface MapProps {
  offerings: Record<string, any>;
  categories: Record<string, any>;
  gotoOffering: (offeringId: string) => void;
}

class PureLandingMap extends Component<MapProps, State> {
  state = {
    lat: -30.854799,
    lng: 152.842086,
    zoom: 13,
    markers: [],
    bounds: [],
  };

  componentDidUpdate(prevProps) {
    const { offerings, categories } = this.props;

    if (
      (!prevProps.offerings['loaded'] || !prevProps.categories['loaded']) &&
      offerings['loaded'] &&
      categories['loaded']
    ) {
      this.loadMarkers();
    }
  }

  async loadMarkers() {
    const { offerings, categories } = this.props;
    const { bounds, markers } = this.state;

    for (let i = 0; i < offerings['items'].length; i++) {
      const offering = offerings['items'][i];

      for (const key in offering.attributes) {
        if (
          key.indexOf('_Location_address') >= 0 &&
          offering.attributes[key] &&
          offering.attributes[key].length > 0
        ) {
          const latlng = await this.fetchLatLng(offering.attributes[key]);
          bounds.push([latlng['lat'], latlng['lng']]);

          const marker = {
            key: 'marker' + i,
            position: [latlng['lat'], latlng['lng']],
            content: {
              name: offering.name,
              address: offering.attributes[key],
              uuid: offering.uuid,
            },
          };

          for (let j = 0; j < categories.items.length; j++) {
            const cat = categories.items[j];

            if (cat.uuid === offering.category_uuid) {
              marker['iconUrl'] = cat.icon;
              marker.content['category'] = cat.title;
              marker.content['cate_id'] = cat.uuid;
              marker.content['sections'] = this.getSections(offering, cat);
              break;
            }
          }

          markers.push(marker);
        }
      }
    }

    this.setState({ bounds: bounds, markers: markers });
  }

  fetchLatLng(addr) {
    return new Promise((resolve, reject) => {
      esriGeocoder().then(geocoder =>
        geocoder
          .geocode()
          .text(addr)
          .run((err, resp) => {
            if (err) {
              reject(err);
            }

            resolve(resp.results[0].latlng);
          }),
      );
    });
  }

  getSections(offering, category) {
    const attributes = offering.attributes;
    const sections = category.sections.filter(section =>
      section.attributes.some(attr => attributes.hasOwnProperty(attr.key)),
    );

    const results = [];
    const standaloneSections = sections.filter(s => s.is_standalone === true);

    standaloneSections.forEach(section => {
      section.attributes
        .filter(attr => attributes.hasOwnProperty(attr.key))
        .map(attr => {
          const value = attributes[attr.key];
          let retVal;

          switch (attr.type) {
            case 'list': {
              const titles = [];

              if (Array.isArray(value)) {
                value.forEach(key => {
                  const option = attr.options.find(item => item.key === key);
                  if (option) {
                    titles.push(option.title);
                  }
                });
              }

              retVal = (
                <>
                  {titles.map((item, index) => (
                    <span key={index}>
                      <i className="fa fa-check" />
                      {` ${item}`}
                      <br />
                    </span>
                  ))}
                </>
              );

              break;
            }

            case 'boolean': {
              const icon =
                value === true
                  ? 'fa fa-check text-info'
                  : 'fa fa-times text-danger';
              retVal = <i className={icon} />;
              break;
            }

            case 'choice': {
              const option = attr.options.find(item => item.key === value);
              retVal = <>{option ? option.title : 'N/A'}</>;
              break;
            }

            case 'html':
              retVal = <FormattedHtml html={value.toString()} />;
              break;
            default:
              retVal = value === undefined ? 'N/A' : value;
          }

          results.push({
            title: attr.title,
            value: retVal,
          });
        });
    });

    return results;
  }

  render() {
    const { bounds, lat, lng, zoom, markers } = this.state;

    if (bounds.length) {
      return (
        <Map bounds={bounds} scrollWheelZoom={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkersList
            markers={markers}
            gotoOffering={this.props.gotoOffering}
          />
        </Map>
      );
    } else {
      const position = [lat, lng];

      return (
        <Map center={position} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      );
    }
  }
}

const mapDispatchToProps = {
  gotoOffering: actions.gotoOffering,
};

const mapStateToProps = () => ({});

const enhance = connect(mapStateToProps, mapDispatchToProps);

export const LandingMap = enhance(PureLandingMap);
