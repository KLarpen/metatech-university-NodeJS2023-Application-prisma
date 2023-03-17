async (spotId, chargingPortId) => {
  console.log({ method: 'parking.rentSpot', spotId, chargingPortId });
  return { status: 'ok' };
};
