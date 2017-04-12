import { parseResponse } from '../../src/utils/ajaxUtils.ts';

const BadRequest = 400;
const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

describe('ajaxUtils', () => {
  describe('parse response', () => {
    it('should resolve ok object', (done) => {
      const receivedBody = { 'property': 'value' };
      const response = new Response(JSON.stringify(receivedBody), { status: OK });

      parseResponse(response).then((receivedObject) => {
        expect(receivedObject).toEqual(receivedBody);
        done();
      });
    });

    it('should create server unavailable error', (done) => {
      const response = new Response(undefined, { status: INTERNAL_SERVER_ERROR });
      const expectedErrorMessage = 'Server unavailable. Try again later.';

      parseResponse(response).catch((error) => {
        expect(error.message).toEqual(expectedErrorMessage);
        done();
      });
    });

    it('should create server unavailable error', (done) => {
      const response = new Response(JSON.stringify({
        'message': 'The request is invalid.',
        'modelState': { 'id': ['Id is read-only'] },
      }),
      { status: BadRequest });
      const expectedMessage = 'Id is read-only.\n';

      parseResponse(response).catch((error) => {
        expect(error.message).toEqual(expectedMessage);
        done();
      });
    });
  });
});
