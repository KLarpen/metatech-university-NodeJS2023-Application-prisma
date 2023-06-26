({
  method: async ({ name, memberIdList }) => {
    console.log({ method: 'messenger.createArea', name, memberIdList });
    return { status: 'ok', area: { name } };
  },
});
