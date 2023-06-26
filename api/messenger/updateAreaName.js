({
  method: async ({ areaId, name }) => {
    console.log({ method: 'messenger.updateAreaName', areaId, name });
    return { status: 'ok' };
  },
});
