import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'comp90024a2',
    locale: true,
    logo: '/pro_icon.svg',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    // {
    //   path: '/user',
    //   layout: false,
    //   routes: [
    //     {
    //       name: 'login',
    //       path: '/user/login',
    //       layout: false,
    //       component: './user/login',
    //     },
    //   ],
    // },
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    }, // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //   ],
    // },
    // {
    //   name: 'list.table-list',
    //   icon: 'table',
    //   path: '/list',
    //   component: './ListTableList',
    // },
    {
      path: '/',
      redirect: '/welcome',
    },
    // {
    //   name: 'Heat Map',
    //   icon: 'fire',
    //   path: '/heat-map',
    //   component: './HeatMap',
    // },
    {
      name: '#ScoMo',
      icon: 'fire',
      path: '/scomo',
      component: './ScoMo',
    },
    // {
    //   name: 'Intensity Map',
    //   icon: 'smile',
    //   path: '/intensity-map',
    //   component: './IntensityMap',
    // },
    {
      name: 'RetweetMap',
      icon: 'twitter',
      path: '/retweetmap',
      component: './RetweetMap',
    },
    {
      name: 'lang',
      icon: 'translation',
      path: '/lang',
      component: './Lang',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
