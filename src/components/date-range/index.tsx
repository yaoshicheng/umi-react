// @ts-nocheck
import React, { FC, useState, useMemo, useEffect } from 'react';
import { Button, Divider, DatePickerView, Toast } from 'antd-mobile';
import classnames from 'classnames';
import { CheckOutline } from 'antd-mobile-icons';

import CustomPopup from '@/components/popup';
import { getDateRange, formatRange } from '@/utils/index';
import { DATE_OPTIONS } from '@/const';
import './index.less';

type IProps = {
  onChange: () => any;
  onOpen?: () => any;
  open?: boolean;
  safeAreaBottom?: number | string;
  dateType?: string;
  dateLabel?: string;
  startTime?: string;
  endTime?: string;
};

const DateRange: FC<IProps> = (props) => {
  const {
    onChange,
    open = false,
    safeAreaBottom = 0,
    startTime,
    endTime,
  } = props;

  const initDate = useMemo(() => getDateRange(90), []);
  const [datePickerStart, setDatePickerStart] = useState(initDate[0]);
  const [datePickerEnd, setDatePickerEnd] = useState(initDate[1]);

  const _formatValue = useMemo(() => formatRange(initDate), []);
  const [filterDateType, setFilterDateType] = useState('5');
  const [filterDateLabel, setFilterDateLabel] = useState(
    _formatValue && _formatValue.length === 2 ? _formatValue.join(' - ') : '',
  );

  const [filterTmpDateType, setFilterTmpDateType] = useState('5');
  const [filterTmpDateLabel, setFilterTmpDateLabel] = useState(
    _formatValue && _formatValue.length === 2 ? _formatValue.join(' - ') : '',
  );

  const [dateOptionOpen, setDateOptionOpen] = useState(open);
  const [formatValue, setFormatValue] = useState<any[]>(_formatValue);

  const [curDateType, setCurDateType] = useState<string>('start');

  useEffect(() => {
    if (startTime && endTime) {
      const _datePickerStart = new Date(+startTime);
      const _datePickerEnd = new Date(+endTime);
      setDatePickerStart(_datePickerStart);
      setDatePickerEnd(_datePickerEnd);
      const _formatValue = formatRange([_datePickerStart, _datePickerEnd]);
      console.log(123, _formatValue);
      setFormatValue(_formatValue);
      setFilterDateLabel(_formatValue.join(' - '));
    }
  }, [startTime, endTime]);

  const handleDateOptionOpen = () => {
    setDateOptionOpen(true);
  };

  const handleConfirm = () => {
    if (datePickerStart.getTime() > datePickerEnd.getTime()) {
      return Toast.show({
        content: '请确保起始日期在截至日期之前！',
        duration: 2000,
      });
    }

    setFilterDateType(filterTmpDateType);
    setFilterDateLabel(filterTmpDateLabel);
    onChange &&
      onChange({
        paperDrawDateStart: datePickerStart ? datePickerStart.getTime() : '',
        paperDrawDateEnd: datePickerEnd ? datePickerEnd.getTime() : '',
      });
    setDateOptionOpen(false);
  };

  const handleFilterDateType = (value: string) => {
    setFilterTmpDateType(value);

    const newDate = getDateRange(+value);
    const [start, end] = newDate;
    setDatePickerStart(start);
    setDatePickerEnd(end);
    const _formatValue = formatRange(newDate);
    setFormatValue(_formatValue);

    const filter = DATE_OPTIONS.filter((date) => date.value === value);
    if (filter.length) {
      setFilterTmpDateLabel(filter[0]?.label);
    } else if (_formatValue && _formatValue.length === 2) {
      setFilterTmpDateLabel(_formatValue.join(' - '));
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          marginLeft: '12px',
          color: '#222',
        }}
        onClick={handleDateOptionOpen}
        className={classnames('custom-date-arrow', {
          'custom-date-arrow-down': dateOptionOpen,
        })}
      >
        <div
          style={{
            maxWidth: '140px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {filterDateLabel}
        </div>
      </div>
      <CustomPopup
        title={'选择创建日期'}
        open={dateOptionOpen}
        style={{ height: '360px' }}
        rounded
        onClose={() => {
          setFilterTmpDateType(filterDateType);
          setFilterTmpDateLabel(filterDateLabel);
          setDateOptionOpen(false);
        }}
        closeable={true}
        cancelable={false}
        // style={{ background: '#eee', maxHeight: '80%' }}
      >
        <div style={{ padding: '12px', height: `${+safeAreaBottom + 550}px` }}>
          <div style={{ margin: '16px 0px', color: '#666', fontSize: '14px' }}>
            日期选择
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
            }}
          >
            {DATE_OPTIONS.map(({ label, value }) => (
              <div
                key={value}
                className={classnames('custom-tag-normal', {
                  'custom-tag-active': filterTmpDateType === value,
                })}
                style={{ width: '23%' }}
                onClick={() => handleFilterDateType(value)}
              >
                {label}
                {filterTmpDateType === value && (
                  <div className="custom-tag-selected-wrap">
                    <CheckOutline
                      color="#fff"
                      fontSize={10}
                      className="custom-tag-selected-icon"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ margin: '16px 0px', color: '#666', fontSize: '14px' }}>
            自定义日期
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              className={classnames('custom-tag-normal-outline', {
                'custom-tag-normal-outline-active': curDateType === 'start',
              })}
              style={{ width: '160px' }}
              onClick={() => {
                setCurDateType('start');
              }}
            >
              {formatValue[0] ? (
                formatValue[0]
              ) : (
                <span style={{ color: '#BFBFBF' }}>起始日期</span>
              )}
            </div>
            <div style={{ margin: '12px' }}>至</div>
            <div
              className={classnames('custom-tag-normal-outline', {
                'custom-tag-normal-outline-active': curDateType === 'end',
              })}
              style={{ width: '160px' }}
              onClick={() => {
                setCurDateType('end');
              }}
            >
              {formatValue[1] ? (
                formatValue[1]
              ) : (
                <span style={{ color: '#BFBFBF' }}>截止日期</span>
              )}
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '16px' }}>
            {curDateType === 'start' && (
              <DatePickerView
                visible={true}
                forceRender
                defaultValue={datePickerStart}
                onChange={(date) => {
                  setFilterTmpDateType('5');
                  setDatePickerStart(date);
                  const _formatValue = formatRange([date, datePickerEnd]);
                  setFormatValue(_formatValue);
                  setFilterTmpDateLabel(_formatValue.join(' - '));
                }}
              ></DatePickerView>
            )}
            {curDateType === 'end' && (
              <DatePickerView
                visible={true}
                onClose={() => {
                  setVisible(false);
                }}
                defaultValue={datePickerEnd}
                onChange={(date) => {
                  setFilterTmpDateType('5');
                  setDatePickerEnd(date);

                  const _formatValue = formatRange([datePickerStart, date]);
                  setFormatValue(_formatValue);
                  setFilterTmpDateLabel(_formatValue.join(' - '));
                }}
              ></DatePickerView>
            )}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            width: '100%',
          }}
        >
          <Divider style={{ margin: 0 }}></Divider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '12px',
            }}
          >
            <Button
              fill="outline"
              color="default"
              shape="rounded"
              className="custom-popup-button"
              style={{ border: '1px solid #eee', padding: '8px' }}
              onClick={() => {
                setDateOptionOpen(false);
              }}
            >
              取消
            </Button>
            <Button
              fill="outline"
              color="primary"
              shape="rounded"
              className="custom-popup-button"
              style={{
                background: '#3C619A',
                color: '#fff',
                border: 'none',
                padding: '8px',
              }}
              onClick={handleConfirm}
            >
              确定
            </Button>
          </div>
          <div style={{ height: `${+safeAreaBottom}px` }}></div>
        </div>
      </CustomPopup>
    </>
  );
};

export default DateRange;
