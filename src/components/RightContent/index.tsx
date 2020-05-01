import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if (navTheme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      {/*<HeaderSearch*/}
      {/*  className={`${styles.action} ${styles.search}`}*/}
      {/*  placeholder="Search"*/}
      {/*  defaultValue="Cluster and Cloud Computing"*/}
      {/*  options={[*/}
      {/*    { label: <a href="https://handbook.unimelb.edu.au/2020/subjects/comp90024">Cluster and Cloud Computing</a>, value: 'Cluster and Cloud Computing' },*/}
      {/*    //todo add more search links here*/}
      {/*  ]}*/}
      {/*  // onSearch={value => {*/}
      {/*  //   //console.log('input', value);*/}
      {/*  // }}*/}
      {/*/>*/}
      {/*<Tooltip title="FAQ">*/}
      {/*  <a*/}
      {/*    target="_blank"*/}
      {/*    href="#"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*    className={styles.action}*/}
      {/*  >*/}
      {/*    <QuestionCircleOutlined />*/}
      {/*  </a>*/}
      {/*</Tooltip>*/}
      {/*<Avatar />*/}
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};
export default GlobalHeaderRight;
