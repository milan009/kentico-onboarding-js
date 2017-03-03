import memoize from 'memoizee';

const selectViewItems = memoize((state) => {
  const items = state.itemsOrder.map((item) => {
    const itemData = state.itemsById.get(item);
    const itemFlags = state.itemsFlags.get(item);
    return Object.assign(itemData, itemFlags);
  });
  return items;
});

export { selectViewItems };
