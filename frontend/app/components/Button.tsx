import React from 'react';

type PillButtonProps = {
    label: string;
    onClick: () => void;
};

const PillButton: React.FC<PillButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default PillButton;
