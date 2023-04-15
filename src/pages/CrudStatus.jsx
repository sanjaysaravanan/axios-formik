import React from 'react';

const CrudStatus = React.createContext({
  showMsg: false,
  message: '',
  type: 'success'
});

export default CrudStatus;
