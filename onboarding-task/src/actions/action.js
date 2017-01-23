const action = (actionType, data) => ({
  ...data,
  type: actionType,
});

export default action;
