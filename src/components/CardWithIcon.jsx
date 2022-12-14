/* eslint-disable no-nested-ternary */
import React from 'react';

export default function CardWithIcon({ Icon, amount, title, CircleIcon, LeftCircleClassName }) {
  return (
    <div className="card_main_div">
      <Icon />
      <div className="card_content_div">
        <span className="amount">{amount}</span>
        <span className="title">{title}</span>
      </div>
      <CircleIcon className={LeftCircleClassName} />
    </div>
  );
}

// how to use this component

/* <CardWithIcon
        Icon={Patients}
        amount={65}
        title="Total Staff"
        CircleIcon={Circle}
        LeftCircleClassName="yellow_circle"
      /> */
