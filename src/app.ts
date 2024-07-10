import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Vconsole from 'vconsole';
// 测试环境打开VCONSOLE
location.host !== 'XXXXXXXXX' && new Vconsole();
// new Vconsole();
const queryClient = new QueryClient();
// 默认不在挂载和focus时自动运行，不重试，但是默认enable为true，根据依赖变化自动运行
queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  },
});
export function rootContainer(container: any) {
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    container,
  );
}
