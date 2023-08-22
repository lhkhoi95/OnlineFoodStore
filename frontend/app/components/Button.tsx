const PillButton: React.FC<PillButtonProps> = ({
  label,
  disable,
  handleClick,
}) => {
  const hideButtonClass = `w-full h-[40px] px-4 py-2 text-medium text-white bg-[#84593C] rounded-md hover:bg-[#6E4F34] focus:outline-none focus:ring-2 focus:ring-[#966F4A] focus:ring-offset-2`;

  const showButtonClass = `w-full h-[40px] px-4 py-2 font-medium text-white bg-[#84593C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#966F4A]  focus:ring-offset-2`;
  return (
    <button
      className={disable ? showButtonClass : hideButtonClass}
      onClick={handleClick}
      type="button"
      disabled={disable}
    >
      {label}
    </button>
  );
};

export default PillButton;
