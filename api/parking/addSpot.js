({
  method: async ({
    parkingId,
    floor,
    place,
    cost,
    suitableFor,
    electricChargerIdList,
    chargingPortIdList,
  }) => {
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
});
