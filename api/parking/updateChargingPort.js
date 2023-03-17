async (chargingPortId, { available, cost, power }) => {
  console.log({
    method: 'parking.updateChargingPort',
    chargingPortId,
    available,
    cost,
    power,
  });
  return { status: 'ok' };
};
