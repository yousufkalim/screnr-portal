import React from 'react';

export default function StatsCard({ Icon, amount, title, BottomStats, statsCardClassName }) {
  return (
    <div className={statsCardClassName}>
      <div className="stats_card_content_div">
        <Icon />
        <div className="card_content_div2">
          <span className="amount">{amount}</span>
          <span className="title">{title}</span>
        </div>
      </div>
      <div>
        <BottomStats className="bottomStats" />
      </div>
    </div>
  );
}
