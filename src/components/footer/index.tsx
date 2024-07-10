import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
// import { FixedView } from 'antd-mobile';
import classnames from 'classnames';
import './index.less';

type IProps = {
  className?: string;
  safeAreaBottom?: number;
  placeholder?: boolean; // 是否需要占位符
  onlyChildrenArea?: boolean; // 是否仅展示子节点区域
};

const FixedFooter: FC<PropsWithChildren<IProps>> = ({
  children,
  className = '',
  safeAreaBottom = 0,
}) => {
  const [height, setHeight] = useState<number>(50);

  useEffect(() => {
    setHeight(+safeAreaBottom + height);
  }, [safeAreaBottom]);

  return (
    <div
      style={{
        height: `${height}px`,
        position: 'fixed',
        bottom: '0px',
        background: '#fff',
        width: '100%',
      }}
    >
      <div className={classnames('custom-footer', className)}>
        <div>{children}</div>
        <div style={{ height: `${+safeAreaBottom}px` }}></div>
      </div>
    </div>
  );
};

export default FixedFooter;
