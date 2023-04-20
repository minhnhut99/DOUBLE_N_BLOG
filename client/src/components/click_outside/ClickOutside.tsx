import React, { useRef, useEffect, FC } from "react";

interface ClickOutsideProps {
  onClickOutside: () => void;
  children: React.ReactNode
}

const ClickOutside: FC<ClickOutsideProps> = ({ onClickOutside, children }: ClickOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default ClickOutside;