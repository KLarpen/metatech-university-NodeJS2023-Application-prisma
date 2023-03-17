async (areaId, text) => {
  console.log({ method: 'messenger.sendMessage', areaId, text });
  return { status: 'ok', message: { areaId, text } };
};
