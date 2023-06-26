({
  method: async ({ name, address, location }) => {
    console.log({ method: 'parking.createParking', name, address, location });
    return { status: 'ok', parking: { name, address, location } };
  },
});
