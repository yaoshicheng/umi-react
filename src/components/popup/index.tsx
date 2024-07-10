import React, { FC, ReactNode, PropsWithChildren, CSSProperties } from 'react';
import { Popup as ElPopup } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import classnames from 'classnames';
import './index.less';
// import { SYSTEM_INFO } from '@/const';

type IProps = {
  title?: ReactNode;
  cancelable?: boolean;
  closeable?: boolean;
  rounded?: boolean;
  open: boolean;
  style?: CSSProperties;
  onClose?: () => void;
  className?: string;
  customMask?: ReactNode;
  rightExtras?: ReactNode;
  safeAreaBottom?: string;
  onlyChildrenArea?: boolean; // 是否仅展示子节点区域
};

const Popup: FC<PropsWithChildren<IProps>> = ({
  title,
  safeAreaBottom = 0,
  cancelable = true,
  closeable = false,
  open = false,
  rounded = true,
  onClose,
  style = {},
  className,
  rightExtras,
  customMask = null,
  onlyChildrenArea = false,
  children,
}) => (
  <ElPopup
    visible={open}
    onMaskClick={onClose}
    // onClose={onClose}
    position="bottom"
    // rounded={rounded}
    style={{ maxHeight: '60%', ...style }}
    className={classnames(className, {
      'custom-popup': open,
      'custom-popup-rounded': rounded,
    })}
  >
    <div className="custom-popup-head">
      <div className="custom-popup-head__left">
        {cancelable && <span onClick={() => onClose?.()}>取消</span>}
      </div>
      <div className="custom-popup-head__center">{title}</div>
      <div className="custom-popup-head__right">
        {closeable && (
          <CloseOutline
            className="icon-close"
            fontSize="22"
            onClick={() => onClose?.()}
          />
        )}
        {rightExtras}
      </div>
    </div>
    <div className="custom-popup-body" style={{ height: 'calc(100% - 0px)' }}>
      {children}
    </div>
    <div style={{ height: `${+safeAreaBottom}px` }}></div>
    {customMask}
  </ElPopup>
);

export default Popup;
