const Footer = () => {
  return (
    <div className="w-full border-t-[1px] bg-transparent border-t-black z-1 py-[1rem] flex items-center justify-center absolute bottom-0">
      <div className="w-full h-full opacity-90 md:bg-[#F7F4ED] bg-black absolute bottom-0 z-[-1]"></div>
      <div className="flex text-sm text-white md:text-black justify-between gap-[1rem]">
        <div>Home</div>
        <div className="hidden md:block">Status</div>
        <div>About</div>
        <div className="hidden md:block">Careers</div>
        <div className="hidden md:block">Press</div>
        <div className="hidden md:block">Blog</div>
        <div>Privacy</div>
        <div>Terms</div>
        <div className="hidden md:block">Text to Speech</div>
        <div className="hidden md:block">Teams</div>
      </div>
    </div>
  );
};

export default Footer;
