declare namespace api.messenger {
  function createArea(params: {
    name: string;
    memberIdList: number[];
  }): Promise<{ status: string; area: object }>;
  function updateAreaName(
    areaId: number,
    name: string,
  ): Promise<{ status: string }>;
  function updateAreaMembers(
    areaId: number,
    memberIdList: number[],
  ): Promise<{ status: string }>;
  function transferAreaOwnership(
    areaId: number,
    ownerId: number,
  ): Promise<{ status: string }>;
  export function readArea(
    areaId: number,
  ): Promise<{ status: string; areas: object[] }>;
  function sendMessage(
    areaId: number,
    text: string,
  ): Promise<{ status: string; message: object }>;
  function readMessages(
    areaId: number,
  ): Promise<{ status: string; messages: object[] }>;
}
