import React, { createRef, FunctionComponent } from 'react';
import { Map as BaseMap, TileLayer, ZoomControl } from 'react-leaflet';
import { useConfigureLeaflet, useMapServices, useRefEffect } from '../hooks';
import { isDomAvailable } from '../lib/util';

const DEFAULT_MAP_SERVICE = 'OpenStreetMap';

const Map: FunctionComponent<{
  defaultBaseMap: string;
  mapEffect: (map: BaseMap | null) => void;
  className?: string;
}> = ({
  children,
  className,
  defaultBaseMap = DEFAULT_MAP_SERVICE,
  mapEffect,
  ...rest
}) => {
  const mapRef = createRef<BaseMap>();

  useConfigureLeaflet();

  useRefEffect({
    ref: mapRef,
    effect: mapEffect,
  });

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
      <BaseMap ref={mapRef} {...mapSettings}>
        {children}
        {basemap && <TileLayer {...basemap} />}
        <ZoomControl position="bottomright" />
      </BaseMap>
    </div>
  );
};

export default Map;
