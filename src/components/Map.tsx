import React, { FunctionComponent } from 'react';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';
import { useConfigureLeaflet } from '../hooks';
import { isDomAvailable } from '../lib/util';
import { getMapServiceByName } from '../lib/map-services';

const DEFAULT_MAP_SERVICE = 'OpenStreetMap';

const Map: FunctionComponent<{
  defaultBaseMap: string;
  className?: string;
}> = ({
  children,
  className,
  defaultBaseMap = DEFAULT_MAP_SERVICE,
  ...rest
}) => {
  useConfigureLeaflet();

  const basemap = getMapServiceByName(defaultBaseMap);

  const mapClassName = `map`;

  if (!isDomAvailable()) {
    return (
      <div className={`${mapClassName} ${className || ''}`}>
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  const mapSettings = {
    className: 'map-base',
    zoomControl: false,
    ...rest,
  };

  return (
    <div className={mapClassName}>
      <BaseMap {...mapSettings}>
        {basemap && <TileLayer {...basemap} />}
        {children}
        <ZoomControl position="bottomright" />
      </BaseMap>
    </div>
  );
};

export default Map;
