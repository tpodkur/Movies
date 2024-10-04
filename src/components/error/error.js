import React from 'react';
import { Alert } from 'antd';

const Error = ({ message, description }) => {
  return <Alert message={message} description={description} type="error" />;
};

export default Error;
