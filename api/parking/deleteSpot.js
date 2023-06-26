({
  method: async ({ spotId }) => {
    console.log({ method: 'parking.deleteSpot', spotId });
    return { status: 'ok' };
  },
});
