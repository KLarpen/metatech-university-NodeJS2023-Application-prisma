({
  access: 'public',
  method: async ({ token }) => {
    console.log({ method: 'auth.restore', token });
    return { status: 'ok' };
  },
});
