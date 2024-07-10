import React, { FC, CSSProperties, ReactNode } from 'react';
import { DotLoading } from 'antd-mobile';
import './index.less';

type IProps = {
  type?: 'circular' | 'spinner';
  size?: number | string;
  direction?: 'horizontal' | 'vertical';
  children?: ReactNode;
  containerStyle?: CSSProperties;
};

const ILoading: FC<IProps> = (props) => {
  const {
    type = 'circular',
    children = '加载中',
    direction = 'vertical',
    containerStyle,
    size = '30px',
  } = props;

  return (
    <>
      <div
        className={'custom-loading-container'}
        style={{ width: '100%', height: '100vh', ...containerStyle }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
          }}
        >
          <DotLoading color="currentColor" />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ILoading;
