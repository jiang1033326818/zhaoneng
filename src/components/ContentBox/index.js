/**
 * Created by Admin on 2018/10/15.
 */
import React from 'react';
import { Button } from 'antd';
import './index.less';

function ContentBox(props) {
  const { title,
    borderColor,
    btnRender,
    btnTitle,
    btnClick,
    children,
    titleClassName,
    titleStyle,
    style,
    className
  } = props;
  return (
    <div className={`item-info-box ${className || ''}`} style={{...style}}>
      <div className={`item-info-title borderLeftGreen ${titleClassName || ''}`} style={{borderColor, ...titleStyle}}>{title}</div>
      {
        btnRender ? btnRender : (
          btnTitle ? <Button className="table-btn" onClick={btnClick} type="primary">{btnTitle}</Button> : ''
        )
      }
      { children }
    </div>
  );
}

export default ContentBox;