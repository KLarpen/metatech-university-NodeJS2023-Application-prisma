({
  method: async ({ socket, current }) => {
    console.log({ method: 'parking.createPortType', socket, current });
    return { status: 'ok', portType: {} };
  },
});
