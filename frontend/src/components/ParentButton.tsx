interface props {
  label: string;
  textSize?: string;
  bgColor?: string;
  textColor?: string;
  width: string;
  fontFamily?: string;
  borderRadius?: string;
  adjustText?: string;
  onClick?: () => void;
}

const ParentButton = ({
  label,
  textSize,
  textColor,
  bgColor,
  width,
  fontFamily,
  borderRadius,
  adjustText,
  onClick,
}: props) => {
  return (
    <button
      className={`${width} px-[1rem] ${
        textColor ? textColor : "text-white"
      } ${adjustText} md:${textSize ? textSize : "text-lg"} ${
        bgColor ? bgColor : "bg-black"
      } py-[0.75rem] cursor-pointer ${
        borderRadius ? borderRadius : "rounded-3xl"
      }
      active:translate-y-[1px] capitalize`}
      style={{ fontFamily: `${fontFamily}` }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ParentButton;
