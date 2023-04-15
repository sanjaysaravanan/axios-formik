import React, { useEffect, useState } from 'react';

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';

import styles from './movie.module.css';
import { movieInstance } from '../../axios/movieIntance';

const MovieItem = ({
  imageUrl,
  title,
  language,
  rating,
  id,
  deleteMovie
}) => {
  return (
    <div
      className={styles.movie}
    >
      <img src={imageUrl} alt={title} className={styles.movieImg} />
      <h6>{title}</h6>
      <h6>{language}</h6>
      <h6>{rating}</h6>
      <Link
        to={`/editMovie/${id}`}
        style={{
          textDecoration: 'none',
          color: '#000'
        }}
      >
        <FaEdit className={styles.editIcon} />
      </Link>
      <MdDelete
        className={styles.deleteIcon}
        onClick={() => {
          deleteMovie(id);
        }}
      />
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