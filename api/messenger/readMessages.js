({
  method: async ({ areaId }) => {
    console.log({ method: 'messenger.readMessages', areaId });
    return { status: 'ok', messages: [] };
  },
});
