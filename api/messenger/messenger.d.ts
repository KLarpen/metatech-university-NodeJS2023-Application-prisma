declare namespace api.messenger {
  function createArea(args: {
    name: string;
    memberIdList: number[];
  }): Promise<{ status: string; area: object }>;
  function updateAreaName(args: {
    areaId: number;
    name: string;
  }): Promise<{ status: string }>;
  function updateAreaMembers(args: {
    areaId: number;
    memberIdList: number[];
  }): Promise<{ status: string }>;
  function transferAreaOwnership(args: {
    areaId: number;
    ownerId: number;
  }): Promise<{ status: string }>;
  export function readArea(args: {
    areaId: number;
  }): Promise<{ status: string; areas: object[] }>;
  function sendMessage(args: {
    areaId: number;
    text: string;
  }): Promise<{ status: string; message: object }>;
  function readMessages(args: {
    areaId: number;
  }): Promise<{ status: string; messages: object[] }>;
}
