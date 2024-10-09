import React from 'react';
import { Tabs as AntdTabs } from 'antd';

const Tabs = ({ searchTabContent, ratedTabContent }) => {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: searchTabContent,
    },
    {
      key: '2',
      label: 'Rated',
      children: ratedTabContent,
    },
  ];

  return (
    <div className="tabs">
      <AntdTabs
        defaultActiveKey="1"
        items={items}
        centered
        tabBarStyle={{ width: '146px', margin: '0 auto 20px auto' }}
      />
    </div>
  );
};

export default Tabs;
