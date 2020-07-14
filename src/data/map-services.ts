import { SimpleMapService } from '../lib/map-services';

export const mapServices: SimpleMapService[] = [
  {
    name: 'OpenStreetMap',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
];
