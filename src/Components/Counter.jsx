import React from 'react';

import { useDispatch } from 'react-redux';

const CountComp = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button type='button' onClick={() => {
        dispatch({ type: 'INC' });
      }} >+</button>
      <button type='button' onClick={() => {
        dispatch({ type: 'DEC' });
      }} >-</button>
      <button type='button' onClick={() => {
        dispatch({ type: 'COUNT_RESET' });
      }} >Reset</button>
    </>
  );
}

export default CountComp;