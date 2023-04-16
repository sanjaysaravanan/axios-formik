import React from 'react';

import { BiDislike, BiLike } from 'react-icons/bi'
import { useDispatch } from 'react-redux';

const StateComp = ({ funcLike, funcDislike }) => {
  const dispatch = useDispatch();
  return (
    <>
      <button type='button' onClick={() => {
        dispatch({ type: 'LIKE' });
      }} ><BiLike /></button>
      <button type='button' onClick={() => {
        dispatch({ type: 'DIS_LIKE' });
      }} ><BiDislike /></button>
      <button type='button' onClick={() => {
        dispatch({ type: 'LIKES_RESET' });
      }} >Reset</button>
    </>
  );
}

export default StateComp;