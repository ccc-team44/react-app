import React from 'react';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrent } from './services/user';
import defaultSettings, { DefaultSettings } from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: DefaultSettings;
}> {
  // todo skip auth
  // if (history.location.pathname !== '/user/login') {
  //   try {
  //     const currentUser = await queryCurrent();
  //     return {
  //       currentUser,
  //       settings: defaultSettings,
  //     };
  //   } catch (error) {
  //     history.push('/user/login');
  //   }
  // }
  return {
    settings: defaultSettings,
  };
}

export const layout = {
  rightRender: () => {
    return <RightContent />;
  },
  footerRender: () => <Footer />,
};
