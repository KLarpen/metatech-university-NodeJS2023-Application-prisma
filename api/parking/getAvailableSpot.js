async (parkingId) => {
  console.log({ method: 'parking.getAvailableSpot', parkingId });
  return { status: 'ok', parkings: [] };
};
