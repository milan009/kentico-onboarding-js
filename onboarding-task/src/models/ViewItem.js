import memoize from 'memoizee';

const createViewModel = (id, index, data, flags) => (
  {
    id,
    index,
    text: data.text,
    isBeingEdited: flags.isBeingEdited,
  }
);

const createItemRecordMemoized = memoize(createViewModel);

export { createItemRecordMemoized as ViewItem };
