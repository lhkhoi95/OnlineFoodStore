import React from 'react'

export const InfoPopup = ({ text }: { text: string }) => {
    return (
        <div className="absolute bg-[#E6CAB1] p-2 rounded-md shadow text-xs font-light">
            {text}
        </div>
    )
}
