import React from 'react';
import classnames from 'classnames';

const DayOrMonth = ({type, changeType}) => {
  return (
    <div className="day-or-month">
      <span
        onClick={() => changeType(1)}
        className={classnames({ active: type === 1 })}
      >当日</span>
      <span
        onClick={() => changeType(2)}
        className={classnames({ active: type === 2 })}
      >当月</span>
    </div>
  )
}

export default DayOrMonth;