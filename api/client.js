// @ts-check
/** @type {typeof import('api/client')} */
({
  async initClient({
    firstName,
    lastName,
    phones,
    vehicleId,
    billingSettingsProto,
  }) {
    console.log({
      method: 'client.initClient',
      firstName,
      lastName,
      phones,
      vehicleId,
      billingSettingsProto,
    });
    return { status: 'ok', client: {} };
  },

  async getKnownVehicles() {
    console.log({ method: 'client.getKnownVehicles' });
    return { status: 'ok', vehicles: [] };
  },

  async createVehicle({ model, kind, portTypeId }) {
    console.log({ method: 'client.createVehicle', model, kind, portTypeId });
    return { status: 'ok', vehicle: {} };
  },

  async addBillingSettings({ cardNo, main }) {
    console.log({ method: 'client.addBillingSettings', cardNo, main });
    return { status: 'ok' };
  },

  async selectMainBilling(billingSettingsId) {
    console.log({ method: 'client.selectMainBilling', billingSettingsId });
    return { status: 'ok' };
  },

  async deleteBillingSettings(billingSettingsId) {
    console.log({ method: 'client.deleteBillingSettings', billingSettingsId });
    return { status: 'ok' };
  },
});
