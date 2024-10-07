import React from 'react';
import { Pagination as AntdPagination } from 'antd';

const Pagination = ({ page, totalItemsCount, onPageChange }) => {
  return (
    <AntdPagination
      defaultCurrent={page}
      total={totalItemsCount}
      pageSize={20}
      showSizeChanger={false}
      onChange={onPageChange}
    />
  );
};

export default Pagination;
