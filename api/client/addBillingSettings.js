async ({ cardNo, main }) => {
  console.log({ method: 'client.addBillingSettings', cardNo, main });
  return { status: 'ok' };
};
