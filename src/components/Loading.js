import React from 'react';

const Loading = () => {
  return (
    <div>
      <div className="spinner-border text-primary">
        <span className="visually-hidden">Loading...</span>
      </div>{' '}
      <span>Loading... Please wait</span>
    </div>
  );
};

export default Loading;
