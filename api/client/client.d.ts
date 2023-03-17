declare namespace api.client {
  function initClient(protoClient: {
    firstName: string;
    lastName: string;
    phones: Array<{ type: string; value: string }>;
    vehicleId: string;
    billingSettingsProto: object;
  }): Promise<{ status: string; client: object }>;
  function getKnownVehicles(): Promise<{
    status: string;
    vehicles: object[];
  }>;
  function createVehicle(record: {
    model: string;
    kind: string;
    portTypeId: number;
  }): Promise<{ status: string; vehicle: object }>;
  function addBillingSettings(record: {
    cardNo: string;
    main?: boolean;
  }): Promise<{ status: string }>;
  function selectMainBilling(
    billingSettingsId,
  ): Promise<{ status: string }>;
  function deleteBillingSettings(
    billingSettingsId,
  ): Promise<{ status: string }>;
}
