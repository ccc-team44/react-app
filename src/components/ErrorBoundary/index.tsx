import * as React from 'react';
import { Result, Typography } from 'antd';
import { Exception500 } from '../Exception';

interface Error {
  componentStack?: string;
  error?: string;
  [key: string]: any;
}

interface IState {
  hasError?: boolean;
  error?: string;
  info?: {
    componentStack?: string;
  };
}

export interface IProps {
  onError?: (error: Error, info: any) => void;
}

const DefaultFallbackComponent = ({ componentStack, error }: Error) => (
  <Result
    status="error"
    title={'Error'}
    subTitle={error!.toString()}
  >
    <Typography.Paragraph>
      <pre>{componentStack}</pre>
    </Typography.Paragraph>
  </Result>
);

class ErrorBoundary extends React.Component<IProps, IState> {
  static defaultProps = {
    onError: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
    };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({
      error,
      info,
    });
    const { onError } = this.props;
    if (onError && typeof onError === 'function') {
      onError(error, info);
    }
  }

  render() {
    const { children, ...restProps } = this.props;
    const { hasError, error, info } = this.state;
    if (hasError) {
      return (
        // @ts-ignore
        (process.env.NODE_ENV === 'development' && (
          <DefaultFallbackComponent
            {...restProps}
            componentStack={info ? info.componentStack : ''}
            error={error}
          />
        )) || <Exception500 />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
