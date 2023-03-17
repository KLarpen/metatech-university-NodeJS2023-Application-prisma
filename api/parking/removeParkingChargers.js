async (parkingId, electricChargerIdList) => {
  console.log({
    method: 'parking.removeParkingChargers',
    parkingId,
    electricChargerIdList,
  });
  return { status: 'ok' };
};
