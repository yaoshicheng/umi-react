/**
 * develop 开发版
 * trial 体验版
 * release 生产版
 */
const ENV_TEXT = {
  develop: '开发',
  trial: '体验',
  release: '生产',
};

// storage 存储字段管理
/**
 * 用户的唯一标识
 */
export const OPEN_ID = 'openId';
/**
 * 用户手机号
 */
export const USER_PHONE = 'userPhone';
/**
 * 绑定到微信开放平台，可用来区分用户唯一性
 */
export const USER_UNION_ID = 'userUnionId';
/**
 * 当前用户 token
 */
export const TOKEN = 'Authori-zation';

/**
 * 分享参数
 */
export const SHARE_SCENE_QUERY = 'share-scene-query';

export const SHARE_SCENE_KEY_MAP = {
  s: 'scene', // 应用场景
  c: 'code', // code 码
  t: 'type', // type 类型
};

// Empty
export const EmptySvg =
  'https://static-website.xforceplus.com/linkus/svg/empty.svg';
// Empty Search
export const EmptySearch =
  'https://static-website.xforceplus.com/linkus/svg/empty-search.svg';

export const subPath = '/bill';
// export const subPath = ''; // 本地

export const STATE_KEY = 'wx_authorize_state';
export const WX_AUTH = 'wx_auth';
export const BACK_URL = 'login_back_url';
export const LOGINTYPE = 'loginType';
export const LONGITUDE = 'user_longitude';
export const LATITUDE = 'user_latitude';