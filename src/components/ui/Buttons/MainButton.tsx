import { FC } from "react";
import { Link } from "react-router";

type Props = {
  content: string;
  to?: string;
  action?: () => void;
  className?: string;
  type?: "button" | "submit";
};

const MainButton: FC<Props> = ({ content, to, action, className = '', type }) => {
  return to === undefined ? (
    <button onClick={action} className={"rounded-4xl py-3 px-5 bg-main-red text-white hover:bg-darker-red cursor-pointer transition-colors " + className} type={type}>
      {content}
    </button>
  ) : (
    <Link
      to={to}
      className={"rounded-4xl py-3 px-5 bg-main-red text-white hover:bg-darker-red cursor-pointer transition-colors " + className}
    >
      {content}
    </Link>
  );
};

export default MainButton;
