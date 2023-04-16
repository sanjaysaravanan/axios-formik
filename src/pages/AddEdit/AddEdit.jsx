import React, { useContext, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MdInfoOutline, MdWarning } from 'react-icons/md';

import styles from './addedit.module.css';
import { movieInstance } from '../../axios/movieIntance';
import ThemeMode from '../../ThemeMode';


const movieSchema = yup.object().shape({
  title: yup.string()
    .min(2, 'Min characters allowed is 2')
    .max(50, 'Max characters allowed is 50')
    .required('Required'),
  imageUrl: yup.string().url('Please check the url format')
    .required('Required'),
  rating: yup.string().required('Please select a rating'),
  language: yup.string().required('Please select a language'),
})

const AddEdit = () => {

  const { id } = useParams();

  const { mode } = useContext(ThemeMode)

  const movieForm = useFormik({
    initialValues: { // key value pair of the form data
      title: '', // should be same as the name of the input
      imageUrl: '',
      rating: '',
      language: '',
    },
    validationSchema: movieSchema,
    onSubmit: (values, { resetForm }) => {
      if (id) {
        movieInstance.put('/' + id, values);
      } else {
        movieInstance.post('', values);
      }
      resetForm();
    }
  });

  useEffect(() => {
    if (id) {
      movieInstance.get(`/${id}`)
        .then((response) => {
          movieForm.setValues(response.data)
        });
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <div
      className={`${styles.root} ${mode === 'dark' ? styles.darkColor : ''}`}
    >
      <h3
        style={{ margin: '4px 0' }}
      >Fill the below detailt to add a movie</h3>
      <form onSubmit={movieForm.handleSubmit} >
        <label
          htmlFor='title'
          style={{ display: 'block' }}
        >Title</label>
        <div
          style={{
            position: 'relative'
          }}
        >
          <input
            name="title"
            placeholder='Enter movie Title'
            id="title"
            className={`${styles.inputEdit} ${movieForm.touched.title && movieForm.errors.title ? styles.errorField : ''}`}
            value={movieForm.values.title}
            onChange={movieForm.handleChange}
            onBlur={movieForm.handleBlur}
          />
          <MdWarning fontSize={'18px'} color='#f00' style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: movieForm.touched.title && movieForm.errors.title ? 'block' : 'none',
          }} />
        </div>
        {movieForm.touched.title && movieForm.errors.title && (
          <div className={styles.validationError} >
            <MdInfoOutline fontSize={'18px'} style={{ marginRight: '4px' }} />
            {movieForm.errors.title}
          </div>
        )}
        <label
          htmlFor='imageUrl'
          style={{ display: 'block' }}
        >Image</label>
        <input
          name="imageUrl"
          placeholder='Image Url'
          id="imageUrl"
          className={`${styles.inputEdit} ${movieForm.touched.imageUrl && movieForm.errors.imageUrl ? styles.errorField : ''}`}
          value={movieForm.values.imageUrl}
          onChange={movieForm.handleChange}
          onBlur={movieForm.handleBlur}
        />
        {movieForm.touched.imageUrl && movieForm.errors.imageUrl && (
          <div className={styles.validationError} >
            {movieForm.errors.imageUrl}
          </div>
        )}
        <label
          style={{ display: 'block' }}
        >Rating</label>
        <label
          htmlFor='u'
        >
          U
        </label>
        <input
          type="radio"
          id="u"
          value='U'
          name="rating"
          onChange={movieForm.handleChange}
          onBlur={movieForm.handleBlur}
          checked={movieForm.values.rating === 'U'}
          style={{
            marginRight: '8px'
          }}
        />
        <label
          htmlFor='ua'
        >
          U/A
        </label>
        <input
          type="radio"
          id="ua"
          value='U/A'
          name="rating"
          onChange={movieForm.handleChange}
          onBlur={movieForm.handleBlur}
          checked={movieForm.values.rating === 'U/A'}
          style={{
            marginRight: '8px'
          }}
        />
        <label
          htmlFor='a'
        >
          A
        </label>
        <input
          type="radio"
          id="a"
          value='A'
          name="rating"
          onChange={movieForm.handleChange}
          onBlur={movieForm.handleBlur}
          checked={movieForm.values.rating === 'A'}
          style={{
            marginRight: '8px'
          }}
        />
        {movieForm.touched.rating && movieForm.errors.rating && (
          <div className={styles.validationError} >
            {movieForm.errors.rating}
          </div>
        )}
        <label
          htmlFor='language'
          style={{ display: 'block' }}
        >Language</label>
        <select
          name='language'
          id="language"
          className={`${styles.inputEdit} ${movieForm.touched.language && movieForm.errors.language ? styles.errorField : ''}`}
          style={{
            width: '100%',
          }}
          value={movieForm.values.language}
          onChange={movieForm.handleChange}
          onBlur={movieForm.handleBlur}
        >
          <option value="" >Please choose an option</option>
          <option value="English" >English</option>
          <option value="Hindi" >Hindi</option>
          <option value="Tamil" >Tamil</option>
          <option value="Telugu" >Telugu</option>
          <option value="Kannada" >Kannada</option>
        </select>
        {movieForm.touched.language && movieForm.errors.language && (
          <div className={styles.validationError} >
            {movieForm.errors.language}
          </div>
        )}
        <div
          style={{
            textAlign: 'center'
          }}
        >
          <button
            type='submit'
            className={styles.submitBtn}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEdit;
