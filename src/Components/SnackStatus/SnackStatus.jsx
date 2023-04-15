import React, { useContext } from 'react';

import { MdClose } from 'react-icons/md';

import CrudStatus from '../../pages/CrudStatus';
import styles from './snack.module.css';

const SnackStatus = () => {
  const { status, setStatus } = useContext(CrudStatus);

  return (
    <div
      className={`${styles.status} ${status.type === 'success' ? styles.bgSuccess : styles.bgError}`}
    >
      {status.message}
      <MdClose
        fontSize={'24px'}
        color="#fff"
        style={{
          cursor: 'pointer',
          margin: '4px'
        }}
        onClick={() => {
          setStatus({
            showMsg: false,
            message: '',
            type: 'success'
          })
        }}
      />
    </div>
  )
};


export default SnackStatus;
