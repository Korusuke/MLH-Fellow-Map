import React, { createRef, FunctionComponent } from 'react';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';
import { useConfigureLeaflet, useMapServices, useRefEffect } from '../hooks';
import { isDomAvailable } from '../lib/util';

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

  const services = useMapServices({
    names: [...new Set([defaultBaseMap, DEFAULT_MAP_SERVICE])],
  });

  const basemap = services.find((service) => service.name === defaultBaseMap);

  let mapClassName = `map`;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  if (!isDomAvailable()) {
    return (
      <div className={mapClassName}>
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
