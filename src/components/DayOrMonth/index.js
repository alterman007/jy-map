import React, { useState } from 'react';
import classnames from 'classnames';

const DayOrMonth = ({type, changeType}) => {
  return (
    <div className="day-or-month">
      <span
        onClick={() => changeType('day')}
        className={classnames({ active: type === 'day' })}
      >日</span>
      <span
        onClick={() => changeType('month')}
        className={classnames({ active: type === 'month' })}
      >月</span>
    </div>
  )
}

export default DayOrMonth;