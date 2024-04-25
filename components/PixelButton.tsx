import React from "react";

interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const PixelButton: React.FC<PixelButtonProps> = ({ label, ...props }) => {
  return (
    <div className="pixel-button-wrap">
      <button
        className="relative font-pixel text-[16px] bg-[#FF4C40] px-3 py-4 rounded pixel-corners capitalize"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 0px",
          textShadow: "rgba(30, 46, 50, 0.5) 1px 2px 0px",
        }}
        {...props}
      >
        {label}
      </button>
    </div>
  );
};

export default PixelButton;
