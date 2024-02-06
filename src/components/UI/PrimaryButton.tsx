import React from 'react';
import { PrimaryButtonInterface } from '../../common/interfaces';

const PrimaryButton:React.FC<PrimaryButtonInterface> = ({ onClick, children }) => {
  return (
    <button
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-8 text-center text-sm font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
