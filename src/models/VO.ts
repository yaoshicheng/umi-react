/**
 * 存放通用VO数据模板定义
 * VO表示显示层数据对象
 *
 */
interface FileInfo {
  createName?: string;
  createTime?: string;
  createUserId?: string;
  fileBelongLine?: string;
  fileName?: string;
  filePreviewUrl?: string;
  fileSize?: number;
  fileType?: string;
  id?: number;
  procStatus?: number;
  remark?: string;
  updateName?: string;
  updateTime?: string;
  updateUserId?: string;
}
