import React from 'react';

interface Props {
  check: string;
}

export default function checkDisplay(props: Props) {
  const { check } = props;
  return (
    <div
      className='checkDisplay'
      style={check ? { display: 'block' } : { visibility: 'hidden' }}
    >
      {check} is in check!
    </div>
  );
}
