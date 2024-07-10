import { FC, PropsWithChildren, ReactNode } from 'react';
import { Flex, Button } from '@taroify/core';
import { View } from '@tarojs/components';
import type { ButtonProps } from '@taroify/core/button';
import classnames from 'classnames';
import Footer from './index';

type ButtonItemProps = {
  span?: number;
  offset?: number;
  render?: ReactNode;
} & ButtonProps;
type IProps = {
  className?: string;
  buttons: ButtonItemProps[];
};

const ButtonItems: FC<PropsWithChildren<ButtonItemProps>> = ({
  span,
  children,
  render,
  ...props
}) => (
  <Flex.Item span={span}>
    {render ?? <Button {...props}>{children}</Button>}
  </Flex.Item>
);

const FixedFooterButtons: FC<PropsWithChildren<IProps>> = ({
  className,
  buttons = [],
  children,
}) => {
  return (
    <Footer className={classnames('custom-footer-button', className)}>
      {children}
      <View className="custom-footer-button__content">
        <Flex gutter={12}>
          {buttons.map((item: ButtonItemProps, index: number) => (
            <ButtonItems {...item} key={index} />
          ))}
        </Flex>
      </View>
    </Footer>
  );
};

export default FixedFooterButtons;
