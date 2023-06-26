declare namespace api.parking {
  function createParking(record: {
    name: string;
    address: {
      country: string;
      state?: string;
      city: string;
      streetAddress: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
  }): Promise<{ status: string; parking: object }>;
  function addParkingChargers(record: {
    parkingId: string;
    electricChargerIdList: string[];
  }): Promise<{ status: string }>;
  function removeParkingChargers(args: {
    parkingId: string;
    electricChargerIdList: string[];
  }): Promise<{ status: string }>;
  function addSpot(record: {
    parkingId: string;
    floor: number;
    place: number;
    cost: number;
    suitableFor: string[];
    electricChargerIdList: string[];
    chargingPortIdList: string[];
  }): Promise<{ status: string; spot: object }>;
  function updateSpot(args: {
    spotId: string;
    available?: boolean;
    cost?: number;
    suitableFor?: string[];
    electricChargerIdList?: string[];
    chargingPortIdList?: string[];
  }): Promise<{ status: string }>;
  function deleteSpot(args: { spotId: string }): Promise<{ status: string }>;
  function createElectricCharger(record: {
    model: string;
    ports: Array<object>;
    parkingId?: string;
  }): Promise<{ status: string; electricCharger: object }>;
  function updateChargingPort(args: {
    chargingPortId: string;
    available?: boolean;
    cost?: number;
    power?: number;
  }): Promise<{ status: string }>;
  function createPortType(record: {
    socket: string;
    current: 'AC' | 'DC';
  }): Promise<{ status: string; portType: object }>;
  function getKnownPortTypes(): Promise<{
    status: string;
    portTypes: object[];
  }>;
  function getAvailableSpot(args: {
    parkingId?: string;
  }): Promise<{ status: string; parkings: object[] }>;
  function rentSpot(args: {
    spotId: string;
    chargingPortId: string;
  }): Promise<{ status: string }>;
  function finishRent(args: {
    rentId: string;
    billingSettingsId?: string;
  }): Promise<{ status: string; totalPrice: number }>;
}
