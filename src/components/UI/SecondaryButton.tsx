import React from 'react';
import { PrimaryButtonInterface } from '../../common/interfaces';

const SecondaryButton: React.FC<PrimaryButtonInterface> = ({ onClick, children }) => {
    return (
        <button
            className="absolute inline-flex items-center  right-0 bottom-0 rounded-md bg-secondary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-10 mr-10 h-9"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
