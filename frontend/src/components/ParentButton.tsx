interface props {
  label: string;
  textSize?: string;
  bgColor?: string;
  textColor?: string;
}

const ParentButton = ({ label, textSize, textColor, bgColor }: props) => {
  return (
    <button
      className={`w-full px-[1rem] rounded-3xl ${
        textColor ? textColor : "text-white"
      } ${textSize ? textSize : "text-lg"} ${
        bgColor ? bgColor : "bg-black"
      } py-[0.75rem] cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default ParentButton;
