import React from 'react';

interface Props {
  check: {
    colour: string;
    flag: boolean;
  };
}

export default function checkDisplay(props: Props) {
  const { check } = props;
  return (
    <div
      className='checkDisplay'
      style={check.flag ? { display: 'block' } : { visibility: 'hidden' }}
    >
      {check.colour} is in check!
    </div>
  );
}
