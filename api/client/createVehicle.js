({
  method: async ({ model, kind, portTypeId }) => {
    console.log({ method: 'client.createVehicle', model, kind, portTypeId });
    return { status: 'ok', vehicle: {} };
  },
});
