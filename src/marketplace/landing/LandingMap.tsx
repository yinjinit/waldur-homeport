import L from 'leaflet';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';

import { translate } from '@waldur/i18n';

import * as actions from './store/actions';

const icon = L.icon({
  iconUrl: 'images/marker-icon.png',
  iconSize: [24, 41],
  iconAnchor: [12, 40],
  popupAnchor: [0, -35],
  shadowUrl: 'images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [12, 40],
});

type Position = [number, number];

type Props = {
  content: string;
  position: Position;
  onClick: (uuid: any) => void;
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

const PopupMarker = ({ content, position, onClick }: Props) => (
  <Marker position={position} icon={icon}>
    <Popup>
      <table className="marker-popup">
        <tbody>
          <tr>
            <th>{translate('Name')}: </th>
            <td>{content['name']}</td>
          </tr>
          <tr>
            <th>{translate('Address')}: </th>
            <td>{content['address']}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button
                bsSize="small"
                bsStyle="primary"
                onClick={() => onClick(content['uuid'])}
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

  async componentDidUpdate(prevProps) {
    const { offerings } = this.props;

    if (!prevProps.offerings['loaded'] && offerings['loaded']) {
      const { bounds, markers } = this.state;

      for (let i = 0; i < offerings['items'].length; i++) {
        const offering = offerings['items'][i];

        for (const key in offering.attributes) {
          if (key.indexOf('_Location_address') >= 0) {
            const latlng = await this.fetchLatLng(offering.attributes[key]);
            bounds.push([latlng['lat'], latlng['lng']]);
            markers.push({
              key: 'marker' + i,
              position: [latlng['lat'], latlng['lng']],
              content: {
                name: offering.name,
                address: offering.attributes[key],
                uuid: offering.uuid,
              },
            });
          }
        }
      }

      this.setState({ bounds: bounds });
    }
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

  render() {
    const { bounds, lat, lng, zoom, markers } = this.state;

    if (bounds.length) {
      return (
        <Map bounds={bounds}>
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
        <Map center={position} zoom={zoom}>
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
