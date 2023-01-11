/* eslint-disable no-nested-ternary */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardWithIcon({
  Icon,
  amount,
  title,
  CircleIcon,
  LeftCircleClassName,
  cardClassName,
  link,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={cardClassName}
      onClick={() => navigate(link || '')}
      role="presentation"
      style={{ cursor: 'pointer' }}
    >
      <Icon />
      <div className="card_content_div">
        <p className="amount">{amount}</p>
        <p className="title" id="title">
          {title}
        </p>
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
