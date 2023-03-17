async (billingSettingsId) => {
  console.log({ method: 'client.deleteBillingSettings', billingSettingsId });
  return { status: 'ok' };
};
