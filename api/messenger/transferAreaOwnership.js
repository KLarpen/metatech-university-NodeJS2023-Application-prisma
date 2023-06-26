({
  method: async ({ areaId, ownerId }) => {
    console.log({ method: 'messenger.transferAreaOwnership', areaId, ownerId });
    return { status: 'ok' };
  },
});
