async (parkingId, electricChargerIdList) => {
  console.log({
    method: 'parking.addParkingChargers',
    parkingId,
    electricChargerIdList,
  });
  return { status: 'ok' };
};
