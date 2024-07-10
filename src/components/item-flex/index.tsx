import React, { FC, PropsWithChildren, ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';

import './index.less';

type IProps = {
  extra?: ReactNode;
  className?: string;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
};
const Card: FC<PropsWithChildren<IProps>> = ({
  extra,
  className,
  children,
  justify = 'space-between',
  leftStyle = {},
  rightStyle = {},
}) => (
  <div
    className={classnames('custom-item', `custom-item--${justify}`, className)}
  >
    <div className="custom-item__left" style={leftStyle}>
      {extra}
    </div>
    <div className="custom-item__right" style={rightStyle}>
      {children}
    </div>
  </div>
);

export default Card;
