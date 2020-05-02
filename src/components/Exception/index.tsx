import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';


interface ExceptionProps {
  exceptionImg: string | any;
  title: string | number;
  description: string;
  footer?: any;
}

function backToHome() {
  history.push('/');
}

const Exception404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Page does not exist"
    extra={
      <Button type="primary" onClick={backToHome}>
        Back
      </Button>
    }
  />
);

const Exception500 = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry Server Error"
    extra={
      <Button type="primary" onClick={backToHome}>
        Back
      </Button>
    }
  />
);

const Exception403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，你无权访问该页面"
    extra={
      <Button type="primary" onClick={backToHome}>
        Back
      </Button>
    }
  />
);

/**
 * 404
 */
const WithExceptionOpChildren: React.FC<{
  currentPathConfig: any;
  children: any;
}> = props => {
  const { children, currentPathConfig } = props;
  if (!currentPathConfig) {
    return <Exception404 />;
  }
  if (currentPathConfig.unAccessible) {
    return <Exception403 />;
  }
  return children;
};

export { Exception404, Exception403, Exception500, WithExceptionOpChildren };
