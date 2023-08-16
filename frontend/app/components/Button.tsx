const PillButton: React.FC<PillButtonProps> = ({
  label,
  disable,
  handleClick,
}) => {
  const hideButtonClass = `w-[120px] h-[40px] px-4 py-2 text-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;
  const showButtonClass = `w-[120px] h-[40px] px-4 py-2 font-medium text-white bg-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;
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
