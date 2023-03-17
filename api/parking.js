// @ts-check
/** @type {typeof import('api/parking')} */
({
  async createParking({ name, address, location }) {
    console.log({ method: 'parking.createParking', name, address, location });
    return { status: 'ok', parking: { name, address, location } };
  },

  async addParkingChargers(parkingId, electricChargerIdList) {
    console.log({
      method: 'parking.addParkingChargers',
      parkingId,
      electricChargerIdList,
    });
    return { status: 'ok' };
  },

  async removeParkingChargers(parkingId, electricChargerIdList) {
    console.log({
      method: 'parking.removeParkingChargers',
      parkingId,
      electricChargerIdList,
    });
    return { status: 'ok' };
  },

  async addSpot({
    parkingId,
    floor,
    place,
    cost,
    suitableFor,
    electricChargerIdList,
    chargingPortIdList,
  }) {
    console.log({
      method: 'parking.addSpot',
      parkingId,
      floor,
      place,
      cost,
      suitableFor,
      electricChargerIdList,
      chargingPortIdList,
    });
    return { status: 'ok', spot: {} };
  },

  async updateSpot(
    spotId,
    { available, cost, suitableFor, electricChargerIdList, chargingPortIdList },
  ) {
    console.log({
      method: 'parking.updateSpot',
      spotId,
      available,
      cost,
      suitableFor,
      electricChargerIdList,
      chargingPortIdList,
    });
    return { status: 'ok' };
  },

  async deleteSpot(spotId) {
    console.log({ method: 'parking.deleteSpot', spotId });
    return { status: 'ok' };
  },

  async createElectricCharger({ model, ports, parkingId }) {
    console.log({
      method: 'parking.createElectricCharger',
      model,
      ports,
      parkingId,
    });
    return { status: 'ok', electricCharger: {} };
  },

  async updateChargingPort(chargingPortId, { available, cost, power }) {
    console.log({
      method: 'parking.updateChargingPort',
      chargingPortId,
      available,
      cost,
      power,
    });
    return { status: 'ok' };
  },

  async createPortType({ socket, current }) {
    console.log({ method: 'parking.createPortType', socket, current });
    return { status: 'ok', portType: {} };
  },

  async getKnownPortTypes() {
    console.log({ method: 'parking.getKnownPortTypes' });
    return { status: 'ok', portTypes: [] };
  },

  async getAvailableSpot(parkingId) {
    console.log({ method: 'parking.getAvailableSpot', parkingId });
    return { status: 'ok', parkings: [] };
  },

  async rentSpot(spotId, chargingPortId) {
    console.log({ method: 'parking.rentSpot', spotId, chargingPortId });
    return { status: 'ok' };
  },

  async finishRent(rentId, billingSettingsId) {
    console.log({ method: 'parking.finishRent', rentId, billingSettingsId });
    return { status: 'ok', totalPrice: 100 };
  },
});
