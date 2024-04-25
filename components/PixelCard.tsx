type PixelCardProps = {
  children: React.ReactNode;
};

const PixelCard = ({ children }: PixelCardProps): React.JSX.Element => {
  return <div className="pixel-corners bg-[#3A5055] flex justify-center items-center p-4">{children}</div>;
};

export default PixelCard;
