export function initClient(protoClient: {
  firstName: string;
  lastName: string;
  phones: Array<{ type: string; value: string }>;
  vehicleId: string;
  billingSettingsProto: object;
}): Promise<{ status: string; client: object }>;
export function getKnownVehicles(): Promise<{
  status: string;
  vehicles: object[];
}>;
export function createVehicle(record: {
  model: string;
  kind: string;
  portTypeId: number;
}): Promise<{ status: string; vehicle: object }>;
export function addBillingSettings(record: {
  cardNo: string;
  main?: boolean;
}): Promise<{ status: string }>;
export function selectMainBilling(
  billingSettingsId,
): Promise<{ status: string }>;
export function deleteBillingSettings(
  billingSettingsId,
): Promise<{ status: string }>;
