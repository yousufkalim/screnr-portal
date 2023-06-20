import React from 'react';

export default function TimeCard({ Icon, time, text, classname, iconTimeClass }) {
  return (
    <div className={classname}>
      <Icon className={iconTimeClass} />
      <div className="card_content_div2">
        <span className="timeLog">{time}</span>
        <span className="lastLog">{text}</span>
      </div>
    </div>
  );
}
