import React, { FC, CSSProperties } from 'react';
import { Empty as EmptyView, Image } from 'antd-mobile';
import { EmptySvg, EmptySearch } from '@/const';
import './index.less';

type IProps = {
  text?: string;
  iconType?: '' | 'search';
  style?: CSSProperties;
  imgStyle?: CSSProperties;
};

const Empty: FC<IProps> = ({
  text = '暂无内容',
  iconType = '',
  style = {},
  imgStyle = {},
}) => (
  <EmptyView
    className="custom-fixed-empty"
    style={style}
    image={
      iconType === 'search' ? (
        <Image src={EmptySearch} style={imgStyle} />
      ) : (
        <Image src={EmptySvg} style={imgStyle} />
      )
    }
    description={text}
  ></EmptyView>
);

export default Empty;
