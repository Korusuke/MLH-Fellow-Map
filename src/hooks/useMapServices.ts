import { getMapServiceByName, SimpleMapService } from '../lib/map-services';
import MapService from '../models/map-service';

const useMapServices = ({
  names = [],
  services: userServices,
}: {
  names: string[];
  services?: SimpleMapService[];
}) => {
  const services = names.map((name) => getMapServiceByName(name, userServices));

  return services
    .map((service) => (service ? new MapService(service) : undefined))
    .filter((service): service is MapService => !!service);
};

export default useMapServices;
