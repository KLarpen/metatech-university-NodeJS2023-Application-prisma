({
  method: async ({ billingSettingsId }) => {
    console.log({ method: 'client.selectMainBilling', billingSettingsId });
    return { status: 'ok' };
  },
});
