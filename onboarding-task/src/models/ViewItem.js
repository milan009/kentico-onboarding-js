import memoize from 'memoizee';

const createViewModel = (index, data, flags) => (
  {
    id: data.id,
    index,
    text: data.text,
    isBeingEdited: flags.isBeingEdited,
  }
);

const createItemRecordMemoized = memoize(createViewModel);

export { createItemRecordMemoized as ViewItem };
