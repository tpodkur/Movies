import React from 'react';
import { Pagination as AntdPagination } from 'antd';

const Pagination = () => {
  return <AntdPagination defaultCurrent={1} total={50} defaultPageSize={20} />;
};

export default Pagination;
