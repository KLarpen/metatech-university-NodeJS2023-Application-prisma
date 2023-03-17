export function createParking(record: {
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
export function addParkingChargers(
  parkingId: string,
  electricChargerIdList: string[],
): Promise<{ status: string }>;
export function removeParkingChargers(
  parkingId: string,
  electricChargerIdList: string[],
): Promise<{ status: string }>;
export function addSpot(record: {
  parkingId: string;
  floor: number;
  place: number;
  cost: number;
  suitableFor: string[];
  electricChargerIdList: string[];
  chargingPortIdList: string[];
}): Promise<{ status: string; spot: object }>;
export function updateSpot(
  spotId: string,
  record: {
    available?: boolean;
    cost?: number;
    suitableFor?: string[];
    electricChargerIdList?: string[];
    chargingPortIdList?: string[];
  },
): Promise<{ status: string }>;
export function deleteSpot(spotId: string): Promise<{ status: string }>;
export function createElectricCharger(record: {
  model: string;
  ports: Array<object>;
  parkingId?: string;
}): Promise<{ status: string; electricCharger: object }>;
export function updateChargingPort(
  chargingPortId: string,
  record: {
    available?: boolean;
    cost?: number;
    power?: number;
  },
): Promise<{ status: string }>;
export function createPortType(record: {
  socket: string;
  current: 'AC' | 'DC';
}): Promise<{ status: string; portType: object }>;
export function getKnownPortTypes(): Promise<{
  status: string;
  portTypes: object[];
}>;
export function getAvailableSpot(
  parkingId?: string,
): Promise<{ status: string; parkings: object[] }>;
export function rentSpot(
  spotId: string,
  chargingPortId: string,
): Promise<{ status: string }>;
export function finishRent(
  rentId: string,
  billingSettingsId?: string,
): Promise<{ status: string; totalPrice: number }>;
