import React from 'react';
import { Pagination as AntdPagination } from 'antd';

const Pagination = ({ page, totalItemsCount, onPageChange }) => {
  return (
    <AntdPagination
      current={page}
      defaultCurrent={1}
      total={totalItemsCount}
      pageSize={20}
      showSizeChanger={false}
      onChange={onPageChange}
    />
  );
};

export default Pagination;
