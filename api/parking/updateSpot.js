async (
  spotId,
  { available, cost, suitableFor, electricChargerIdList, chargingPortIdList },
) => {
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
};
