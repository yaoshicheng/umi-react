/**
 * 计算一维数组指定字段之和
 * @param  {number} scene
 * @returns string
 */

export function transferScene(scene: Number) {
  if (!scene) return '';
  let str = '其他';
  switch (scene) {
    case 1001:
      str = '最近使用';
      break;
    case 1005:
      str = '微信首页顶部搜索框的搜索';
      break;
    case 1006:
      str = '发现栏小程序主入口搜索框的搜索结果页';
      break;
    case 1007:
      str = '单人聊天会话中的小程序消息卡片';
      break;
    case 1008:
      str = '群聊会话中的小程序消息卡片';
      break;
    case 1011:
      str = '扫描二维码';
      break;
    case 1012:
      str = '长按图片识别二维码';
      break;
    case 1013:
      str = '扫描手机相册中选取的二维码';
      break;
    case 1014:
      str = '小程序订阅消息';
      break;
    case 1024:
      str = '小程序 profile 页';
      break;
    case 1026:
      str = '发现栏小程序主入口，「附近的小程序」列表';
      break;
    case 1027:
      str = '微信首页顶部搜索框搜索结果页「使用过的小程序」列表';
      break;
    case 1037:
      str = '小程序打开小程序';
      break;
    case 1038:
      str = '从另一个小程序返回';
      break;
    case 1047:
      str = '扫描小程序码';
      break;
    case 1048:
      str = '长按图片识别小程序码';
      break;
    case 1049:
      str = '扫描手机相册中选取的小程序码';
      break;
    case 1052:
      str = '搜一搜的结果页';
      break;
    case 1145:
      str = '发现栏 - 发现小程序';
      break;
  }
  return str;
}

/**
 * 计算一维数组指定字段之和
 * @param  {number} scene
 * @returns string
 */

// 工作台

export function getPathName(path: string) {
  if (!path) return '';

  const pathNameMap = {
    'pages/workbench/index': '工作台首页',
    'pages/workbench/task-detail/index': '任务详情', // 任务详情
    'pages/workbench/undo-list/index': '待开票任务列表', // 待开票任务列表

    // 发票样张预览页
    'pages/invoice-preview-swiper/index': '待开票任务列表', // 待开票任务列表

    // 开票
    'pages/invoicing/index': '开票',
    'pages/invoicing/title-seller/index': '编辑销方抬头', //  编辑销方抬头
    'pages/invoicing/title-buyer/index': '编辑购方抬头', // 编辑购方抬头
    'pages/invoicing/invoice-item/index': '添加 or 修改明细', // 添加 or 修改明细
    'pages/invoicing/item-name/index': '商品', // 商品
    'pages/invoicing/goods-tax-no/index': '税收分类编码', //  税收分类编码

    // 协作
    'pages/coop/invoicing/index': '协作开票', // 开票
    'pages/coop/invoicing/title-buyer/index': '编辑购方抬头', // 编辑购方抬头
    'pages/coop/invoicing/invoice-item/index': '添加 or 修改明细', // 添加 or 修改明细
    'pages/coop/invoicing/goods-tax-no/index': '税收分类编码', //  税收分类编码
    'pages/coop/pre-invoice/index': '开票预览', //  开票预览
    'pages/coop/pre-invoice/title-buyer/index': '编辑购方抬头', // 编辑购方抬头
    'pages/coop/pre-invoice/remark/index': '预制发票 - 备注', // 预制发票 - 备注
    'pages/coop/pre-invoice/split-rule/index': '预制发票 - 拆票规则', // 预制发票 - 拆票规则
    'pages/coop/pre-invoice/sales-list/index': '预制发票 - 销货清单', // 预制发票 - 销货清单

    // 'pages/pre-invoice-ask/index', // 申请发票-预制发票
    // 'pages/pre-invoice-ask/result/index', // 发票申请结果

    // 预制发票
    'pages/pre-invoice/index': '预制发票', // 预制发票
    'pages/pre-invoice/result/index': '发票开具结果页', // 发票开具结果页
    'pages/pre-invoice/title-seller/index': '查看销方抬头', // 查看销方抬头
    'pages/pre-invoice/title-buyer/index': '编辑购方抬头', // 编辑购方抬头
    'pages/pre-invoice/terminal/index': '预制发票 - 开票设备', // 预制发票 - 开票设备
    'pages/pre-invoice/issuer/index': '预制发票 - 开票人', // 预制发票 - 开票人
    'pages/pre-invoice/issuer-login/index': '预制发票 - 开票人登录', // 预制发票 - 开票人登录
    'pages/pre-invoice/remark/index': '预制发票 - 备注', // 预制发票 - 备注
    'pages/pre-invoice/person/index': '预制发票 - 开票人信息', // 预制发票 - 开票人信息
    'pages/pre-invoice/split-rule/index': '预制发票 - 拆票规则', // 预制发票 - 拆票规则
    'pages/pre-invoice/sales-list/index': '预制发票 - 销货清单', // 预制发票 - 销货清单
    'pages/invoice-list/index': '已开发票列表', // 已开发票列表
    'pages/invoice/overview/index': '已开发票详情', // 已开发票详情

    'pages/pre-invoice-ask/index': '申请发票', // 申请发票
    'pages/pre-invoice-ask/result/index': '申请开票结果', // 申请开票结果

    // 票夹
    'pages/ticket-folder/index': '票夹',

    // 我的
    'pages/my/index': '我的',
    'pages/login/index': '授权登录', // 授权登录
    'pages/setting/index': '设置', // 设置
    'pages/invite/index': '邀请中间页', // 邀请中间页
    'pages/invite/code/index': '授权码', // 授权码
    'pages/privacy/index': '隐私政策', // 隐私政策
    'pages/privacy/template/index': '隐私协议',
    'pages/privacy/templateBak/index': '隐私协议', // 隐私协议
    'pages/privacyAuth/template/index': '隐私协议 - 付款协议', // 隐私协议 - 付款协议

    // 公司管理
    'pages/company/index': '公司管理',
    'pages/company/guide/index': '欢迎页', // 首次授权时跳转添加公司指引
    'pages/company/add/index': '添加公司', // 添加公司
    'pages/company/search/index': '查找企业', // 查找企业
    'pages/company/join/index': '加入企业', // 加入企业

    // 认证
    'pages/auth/index': '中间页', // 中间页
    'pages/auth/license/index': '营业执照认证', // 营业执照认证
    'pages/auth/tax-plate/index': '税盘认证', // 税盘认证
    'pages/auth/result/index': '认证结果', // 认证结果

    // 订单
    'pages/order/index': '订单',
    'pages/order/buy/index': '服务订购', // 服务订购
    'pages/order/result/index': '订单购买结果页', // 订单购买结果页
    'pages/order/detail/index': '订单详情', // 订单详情
    'pages/company/detail/index': '工作台 - 公司详情', // 工作台 - 公司详情

    'pages/title/company/view/index': '工作台 - 查看公司抬头', // 工作台 - 查看公司抬头
    'pages/title/company/edit/index': '工作台 - 编辑公司抬头', // 工作台 - 编辑公司抬头
    'pages/search-company/index': '查找企业',

    // 销货清单
    'pages/sales-list/index': '销货清单',

    'pages/share/index': '分享页', // 分享页
    'pages/share/invoicing/index': '分享 - 开票', // 分享 - 开票
    'pages/share/invoice/index': '分享 - 发票', // 分享 - 发票
  };
//@ts-ignore
  return pathNameMap[path] ?? '其他';
}
