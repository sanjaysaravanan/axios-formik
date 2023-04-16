import React from 'react';
import { useSelector } from 'react-redux';

import StateComp from '../../Components/StatesComp';
import CountComp from '../../Components/Counter';


const States = () => {

  const likesReducer = useSelector((state) => (state.likeReducer));
  const countReducer = useSelector((state) => (state.countReducer));


  // const [likes, setLikes] = useState(0);
  // const [disLikes, setDisLikes] = useState(0);

  // const funcLike = () => {
  //   setLikes(likes + 1)
  // }

  // const funcDislike = () => {
  //   setDisLikes(disLikes + 1)
  // }


  return (
    <>
      <h1>Likes</h1>
      <h3>Likes: {likesReducer.likes}, Dislikes: {likesReducer.dislikes}</h3>
      {/* <StateComp funcDislike={funcDislike} funcLike={funcLike} /> */}
      <StateComp />
      <h1>Count</h1>
      <h3>{countReducer.count}</h3>
      {/* <StateComp funcDislike={funcDislike} funcLike={funcLike} /> */}
      <CountComp />
    </>
  )
};

export default States;