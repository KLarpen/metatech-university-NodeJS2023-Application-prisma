async (areaId) => {
  console.log({ method: 'messenger.readArea', areaId });
  return { status: 'ok', areas: [{ areaId }] };
};
