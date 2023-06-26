({
  method: async ({ areaId, memberIdList }) => {
    console.log({
      method: 'messenger.updateAreaMembers',
      areaId,
      memberIdList,
    });
    return { status: 'ok' };
  },
});
