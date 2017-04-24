import { itParam } from 'mocha-param';
import { checkStatus } from '../../src/utils/ajaxUtils.ts';

describe('checkStatus test', () => {
  const successStatusCodes = [200, 201];
  const neutralStatusCodes = [204];
  const clientErrorStatusCodes = [400, 404];
  const serverErrorStatusCodes = [500];

  itParam(`should return body in json on status codes ${successStatusCodes.join(', ')}`, successStatusCodes, (status) => {
    const body = 'content of the response';
    const response = {
      status,
      json: () => body,
    };

    const result = checkStatus(response);

    expect(result).toEqual(body);
  });

  itParam(`should return statusText on status codes ${neutralStatusCodes.join(', ')}`, neutralStatusCodes, (status) => {
    const statusText = 'content of the statusText';
    const response = {
      status,
      statusText,
    };

    const result = checkStatus(response);

    expect(result).toEqual(statusText);
  });

  itParam(`should return promise with errors array on status codes ${clientErrorStatusCodes.join(', ')}`, clientErrorStatusCodes, (done, status) => {
    const errors = [
      'error 1',
      'error 2',
    ];
    const errorResponse = {
      status,
      json: () => Promise.resolve({
        modelState: {
          'key 0': errors[0],
          'key 1': errors[1],
        },
      }),
    };

    checkStatus(errorResponse)
      .catch(errs => {
        expect(errs).toEqual(errors);
        done();
      });
  });

  itParam(`should return promise with error message on status codes ${serverErrorStatusCodes.join(', ')}`, serverErrorStatusCodes, (done, status) => {
    const errorResponse = {
      status,
    };
    const errorMessage = 'Internal server error message';

    checkStatus(errorResponse, errorMessage)
      .catch(error => {
        expect(error).toEqual([errorMessage]);
        done();
      });
  });
});
