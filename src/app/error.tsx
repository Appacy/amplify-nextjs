'use client';

import React from 'react';

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (
    <div className="error">
      <h2>Error</h2>
      <p>{error?.message}</p>
      <div>
        <button onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  );
}
