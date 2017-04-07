import * as React from 'react';

const Loader = () => {
  return (
    <div className="angryLoaderMain">
      <div className="load">Loading...</div>
      <div className="hands"></div>
      <div className="body"></div>
      <div className="head">
        <div className="eye"></div>
      </div>
    </div>
  );
};

export { Loader };
