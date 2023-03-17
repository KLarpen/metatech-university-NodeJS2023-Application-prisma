// @ts-check
/** @type {typeof import('api/messenger')} */
({
  async createArea({ name, memberIdList }) {
    console.log({ method: 'messenger.createArea', name, memberIdList });
    return { status: 'ok', area: { name } };
  },

  async updateAreaName(areaId, name) {
    console.log({ method: 'messenger.updateAreaName', areaId, name });
    return { status: 'ok' };
  },

  async updateAreaMembers(areaId, memberIdList) {
    console.log({
      method: 'messenger.updateAreaMembers',
      areaId,
      memberIdList,
    });
    return { status: 'ok' };
  },

  async transferAreaOwnership(areaId, ownerId) {
    console.log({ method: 'messenger.transferAreaOwnership', areaId, ownerId });
    return { status: 'ok' };
  },

  async readArea(areaId) {
    console.log({ method: 'messenger.readArea', areaId });
    return { status: 'ok', areas: [{ areaId }] };
  },

  async sendMessage(areaId, text) {
    console.log({ method: 'messenger.sendMessage', areaId, text });
    return { status: 'ok', message: { areaId, text } };
  },

  async readMessages(areaId) {
    console.log({ method: 'messenger.readMessages', areaId });
    return { status: 'ok', messages: [] };
  },
});
