async ({ firstName, lastName, phones, vehicleId, billingSettingsProto }) => {
  console.log({
    method: 'client.initClient',
    firstName,
    lastName,
    phones,
    vehicleId,
    billingSettingsProto,
  });
  return { status: 'ok', client: {} };
};
