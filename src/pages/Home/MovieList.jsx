import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

import { FaEdit, FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md'
import { Link, Navigate } from 'react-router-dom';

import styles from './movie.module.css';
import { movieInstance } from '../../axios/movieIntance';
import { useDispatch, useSelector } from 'react-redux';

const MovieItem = ({
  imageUrl,
  title,
  language,
  rating,
  id,
  deleteMovie
}) => {
  const { accessToken } = JSON.parse(localStorage.getItem('user_details') || '{}');
  const wishReducer = useSelector(state => state.wishReducer);
  const dispatch = useDispatch();

  if (accessToken === undefined) {
    return <Navigate to='/login' replace />
  }

  const { role } = jwt_decode(accessToken);

  return (
    <div
      className={styles.movie}
    >
      <img src={imageUrl} alt={title} className={styles.movieImg} />
      <h6>{title}</h6>
      <h6>{language}</h6>
      <h6>{rating}</h6>
      {role === 'admin' && <Link
        to={`/editMovie/${id}`}
        style={{
          textDecoration: 'none',
          color: '#000'
        }}
      >
        <div
          className={`${styles.actionIcon} ${styles.editIcon}`}
        >
          <FaEdit />
        </div>
      </Link>}
      {role === 'admin' && <div
        className={`${styles.actionIcon} ${styles.deleteIcon}`}
      >
        <MdDelete
          onClick={() => {
            deleteMovie(id);
          }}
        />
      </div>}
      {wishReducer.wishList.find(({ id: movieId }) => movieId === id) ?
        <FaHeart
          onClick={() => {
            dispatch({
              type: 'REMOVE_WISH', movieId: id
            });
          }}
          fontSize={'20px'} color="#f00" />
        :
        <FiHeart onClick={() => {
          dispatch({
            type: 'ADD_WISH', movieItem: {
              imageUrl,
              title,
              language,
              rating,
              id,
            }
          });
        }} fontSize={'20px'} />}
    </div>
  )
}

const MovieList = () => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const deleteMovie = (movieId) => {
    movieInstance.delete('/' + movieId)
      .then(() => {
        setMovies(movies.filter(({ id }) => movieId !== id));
      });
  }

  useEffect(() => {
    movieInstance.get()
      .then(({ data }) => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: '40px',
          textAlign: 'center'
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isLoading && movies.length === 0) {
    return (
      <div
        style={{
          marginTop: '40px',
          textAlign: 'center'
        }}
      >
        No Movies Found {' '}
        <Link
          to={'/addMovie'}
        >
          Click Here
        </Link>{' '}
        to add a new Movie
      </div>
    );
  }

  return (
    <div
      className={styles.moviesDiv}
    >
      {movies.map((movie) => (
        <MovieItem key={movie.id} deleteMovie={deleteMovie} {...movie} />
      ))}
    </div>
  )
};

export default MovieList;