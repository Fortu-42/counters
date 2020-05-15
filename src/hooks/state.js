import { useState, useEffect } from 'react';

function State(actualStatus) {
  useEffect(() => {
    setStatus(actualStatus);
  }, [actualStatus]);

  return status;
}

export default State;
