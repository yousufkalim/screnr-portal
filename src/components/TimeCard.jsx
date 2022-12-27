import React from 'react';

export default function TimeCard({ Icon, time, text }) {
  return (
    <div className="right_sidebar_cards">
      <Icon />
      <div className="card_content_div2">
        <span className="timeLog">{time}</span>
        <span className="lastLog">{text}</span>
      </div>
    </div>
  );
}
