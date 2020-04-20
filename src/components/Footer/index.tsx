import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="COMP90024 Assigment 2 Team 44"
    links={[
      {
        key: 'comp90024',
        title: 'Cluster and Cloud Computing',
        href: 'https://handbook.unimelb.edu.au/2020/subjects/comp90024',
        blankTarget: true,
      },
     //todo add more footer here
    ]}
  />
);
