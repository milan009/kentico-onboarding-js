const NegativeIdException = () => ({
  message: 'Given ID cannot be negative',
  name: 'Invalid param',
});

export const mockIdGenerator = (id = 0) => {
  if (id < 0) {
    throw NegativeIdException();
  }

  let firstPart = id.toString().substr(0, 8);
  firstPart = firstPart + '0'.repeat(8 - firstPart.length);
  return `${firstPart}-0000-0000-0000-000000000000`;
};

