import * as React from 'react';

const errorStatusMessage = ({ error }: { error: string }) => error && error !== ''
  ? (<div className="alert alert-danger" role="alert">
    <strong>Error!</strong> {error}
  </div> )
  : '';

const successStatusMessage = ({ successMessage }: { successMessage: string }) => successMessage && successMessage !== ''
  ? (<div className="alert alert-success" role="alert">
    <strong>Success!</strong> {successMessage}
  </div> )
  : '';

const StatusMessage = ({ error, successMessage }: { error: string; successMessage: string }) => {
  return (
    <span>
      {errorStatusMessage({ error })}
      {successStatusMessage({ successMessage })}
    </span>
  );
};

export { StatusMessage };
