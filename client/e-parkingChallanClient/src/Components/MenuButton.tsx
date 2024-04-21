import React from "react";

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
}
export type IconType = (props: IconBaseProps) => JSX.Element;

interface Props{
    Icon: IconType;
    title: string;
    isActive: string;
    handleClick: (value: string) =>void
}

const MenuButton = ({Icon, title, isActive, handleClick}: Props) => {
  return (
    <div onClick={()=>handleClick(title)}  className={`flex flex-col justify-center p-3 items-center menu-button cursor-pointer ${isActive === title?"active":""}`}>
      <Icon size={16} />
      <p>{title}</p>
    </div>
  );
};

export default MenuButton;
