'use strict';

const scaffold = async (url, structure) => {
  const api = {};
  const parsedURL = new URL(url);
  const protocol = parsedURL.protocol.slice(0, parsedURL.protocol.length - 1);
  const services = Object.keys(structure);

  const http =
    (serviceName, method) =>
    (...args) =>
      new Promise((resolve, reject) => {
        const body = JSON.stringify({ args });
        fetch(`${url}/api/${serviceName}/${method}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': Uint8Array.from(body).byteLength,
          },
          body,
        })
          .then((res) => {
            if (res.ok && res.status === 200) resolve(res.json());
            else
              reject(
                new Error(
                  `Status Code: ${res.status} ${res.statusText} (type: ${res.type})`,
                ),
              );
          })
          .catch(reject);
      });

  const ws =
    (serviceName, method, ws) =>
    (...args) =>
      new Promise((resolve) => {
        const packet = { name: serviceName, method, args };
        ws.send(JSON.stringify(packet));
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          resolve(data);
        };
      });

  /**
   * Collection of the factories for API request handlers.
   * Each factory receives API service/entity name, method for this service
   * and returns a function that makes proper API requests.
   */
  const transportHandlerFactory = { http, ws };

  /**
   * DRY sugar function that mutates `api` object by filling it with
   * API handlers for the provided services structure
   * @param {'http' | 'ws'} transport network transport protocol
   * @param {WebSocket | null} networkClient client that handles network request
   * (`ws` transport requires singleton WebSocket instance, otherwise currently unused)
   */
  const fillApi = (transport, networkClient) => {
    for (const serviceName of services) {
      api[serviceName] = {};
      const service = structure[serviceName];
      const methods = Object.keys(service);
      for (const methodName of methods) {
        api[serviceName][methodName] = transportHandlerFactory[transport](
          serviceName,
          methodName,
          networkClient,
        );
      }
    }
  };

  if (protocol === 'ws') {
    const socket = new WebSocket(url);
    fillApi(protocol, socket);
    await new Promise((resolve) => {
      socket.addEventListener('open', resolve);
    });
  } else fillApi(protocol, null);

  return api;
};

(async () => {
  const api = await scaffold('ws://127.0.0.1:8001', {
    auth: {
      signin: ['login', 'password'],
      signout: [],
      restore: ['token'],
    },
    messenger: {
      createArea: ['name', 'memberIdList'],
      updateAreaName: ['areaId', 'name'],
      updateAreaMembers: ['areaId', 'memberIdList'],
      transferAreaOwnership: ['areaId', 'ownerId'],
      readArea: ['areaId'],
      readMessages: ['areaId'],
      sendMessage: ['areaId', 'text'],
    },
    parking: {
      createParking: ['name', 'address', 'location'],
      addParkingChargers: ['parkingId', 'electricChargerIdList'],
      removeParkingChargers: ['parkingId', 'electricChargerIdList'],
      addSpot: [
        'parkingId',
        'floor',
        'place',
        'cost',
        'suitableFor',
        'electricChargerIdList',
        'chargingPortIdList',
      ],
      updateSpot: [
        'spotId',
        'available',
        'cost',
        'suitableFor',
        'electricChargerIdList',
        'chargingPortIdList',
      ],
      deleteSpot: ['spotId'],
      createElectricCharger: ['model', 'ports', 'parkingId'],
      updateChargingPort: ['chargingPortId', 'available', 'cost', 'power'],
      createPortType: ['socket', 'current'],
      getKnownPortTypes: [],
      getAvailableSpot: ['parkingId'],
      rentSpot: ['spotId', 'chargingPortId'],
      finishRent: ['rentId', 'billingSettingsId'],
    },
    client: {
      initClient: [
        'firstName',
        'lastName',
        'phones',
        'vehicleId',
        'billingSettingsProto',
      ],
      getKnownVehicles: [],
      createVehicle: ['model', 'kind', 'portTypeId'],
      addBillingSettings: ['cardNo', 'main'],
      selectMainBilling: ['billingSettingsId'],
      deleteBillingSettings: ['billingSettingsId'],
    },
  });

  // Global link to use api in console
  window.api = api;

  // Example of usage
  let spot, port;
  const data = await api.auth.signin({ login: 'user', password: 'nopassword' });
  console.dir({ data });
  // Just get common catalogs for usage
  const portTypes = await api.parking.getKnownPortTypes();
  const vehicleModels = await api.client.getKnownVehicles();
  console.dir({ portTypes, vehicleModels });
  // Search for parking spot
  // parkingId in getAvailableSpot() is an optional argument so omitted there
  const searchForSpot = await api.parking.getAvailableSpot();
  console.dir({ searchForSpot });
  if (
    searchForSpot.parkings.length > 0 &&
    searchForSpot.parkings.spots.length > 0
  ) {
    // Let's assume that the first available spot was selected by the user
    spot = searchForSpot.parkings.spots[0];
    if (spot.ports.length > 0) port = spot.ports[0];
  }
  // Rent
  if (spot && port) {
    const renting = api.parking.rentSpot(spot.spotId, port.chargingPortId);
    console.dir({ renting });
  } else {
    console.log('There is no available EV parking spots with chargers');
  }
})();
