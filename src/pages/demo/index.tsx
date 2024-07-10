import React, { FC, useEffect, useState } from 'react';
import { Toast, Modal, ConfigProvider } from 'antd-mobile';
import wx from 'weixin-webview-jssdk';
import Empty from '@/components/empty';
import { history } from 'umi';
import fetch from '@/utils/request';
import CustomLoading from '@/components/fixed-loading';
import './index.less';


type IProps = {};

const Demo: FC<IProps> = ({}) => {
  const query = history.location.query;
  const {
    demo = '',
  } = query;


  // 是否初始化查询待开发票
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    demoApi();

    () => {
      // 卸载前调用
    }
  }, []);

  // useDidHide(() => {
  //   // 清除 待办事项跳转来 billId
  //   // Taro.removeStorageSync(PENDING_SELLER_BILL_ID);
  //   // 清除 待办事项跳转来 billInfo
  //   // Taro.removeStorageSync(PENDING_BILL_INFO);
  //   // 清除 是否切换公司标识
  //   Taro.removeStorageSync(SWITCH_COMPANY);
  //   // 清除 是否是特定购方开票标识
  //   Taro.removeStorageSync(HAS_BUYER_TO_BILL);
  // });

  const demoApi = () => {
    setLoading(true);
    fetch({
      url: `xxxxxxxxxx`,
      method: 'POST',
      data: {},
    })
      .then((data: any) => {
      
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {};


  return (
    <div className="main_wrapper">
      {loading && <CustomLoading />}

      {!loading && (
        <Empty
          style={{
            zIndex: '-1',
            position: 'initial',
            marginTop: '-3px',
          }}
          text="当前暂无可开票内容"
        />
      )}
    </div>
  );
};

export default Demo;
