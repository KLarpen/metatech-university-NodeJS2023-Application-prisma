async (rentId, billingSettingsId) => {
  console.log({ method: 'parking.finishRent', rentId, billingSettingsId });
  return { status: 'ok', totalPrice: 100 };
};
