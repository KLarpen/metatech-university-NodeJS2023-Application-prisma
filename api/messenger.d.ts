export function createArea(params: {
  name: string;
  memberIdList: number[];
}): Promise<{ status: string; area: object }>;
export function updateAreaName(
  areaId: number,
  name: string,
): Promise<{ status: string }>;
export function updateAreaMembers(
  areaId: number,
  memberIdList: number[],
): Promise<{ status: string }>;
export function transferAreaOwnership(
  areaId: number,
  ownerId: number,
): Promise<{ status: string }>;
export function readArea(
  areaId: number,
): Promise<{ status: string; areas: object[] }>;
export function sendMessage(
  areaId: number,
  text: string,
): Promise<{ status: string; message: object }>;
export function readMessages(
  areaId: number,
): Promise<{ status: string; messages: object[] }>;
