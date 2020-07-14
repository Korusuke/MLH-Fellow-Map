import { SimpleMapService } from '../lib/map-services';

class MapService implements SimpleMapService {
  name: string;
  attribution: string;
  url: string;
  _service: SimpleMapService;

  constructor(service: SimpleMapService) {
    this._service = { ...service };

    this.name = this._service.name;
    this.attribution = this._service.attribution;
    this.url = this._service.url;
  }
}

export default MapService;
