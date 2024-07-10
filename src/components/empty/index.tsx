import React, { FC } from 'react';
import { Empty as EmptyView } from 'antd-mobile';
import { EmptySvg, EmptySearch } from '@/const';
import './index.less';

type IProps = {
  text?: string;
  iconType?: '' | 'search';
};

const Empty: FC<IProps> = ({ text = '暂无内容', iconType = '' }) => (
  <EmptyView
    className="custom-empty"
    image={iconType === 'search' ? EmptySearch : EmptySvg}
    description={text}
  ></EmptyView>
);

export default Empty;
