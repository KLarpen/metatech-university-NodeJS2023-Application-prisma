async ({ model, ports, parkingId }) => {
  console.log({
    method: 'parking.createElectricCharger',
    model,
    ports,
    parkingId,
  });
  return { status: 'ok', electricCharger: {} };
};
