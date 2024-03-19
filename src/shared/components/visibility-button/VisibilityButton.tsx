import { useCallback, useState } from "react";

export interface IVisibilityButtonProps {
  defaultVisible?: boolean,
  visibility?: boolean,
  onClick?: (visibility?: boolean) => void,
}

export const VisibilityButton: React.FC<IVisibilityButtonProps> = ({ visibility, onClick, defaultVisible }) => {
  const [visible, setVisible] = useState(defaultVisible || visibility);

  const handleClick = useCallback(() => {
    onClick?.(!visible);
    setVisible(!visible);
  }, [onClick, visible])

  return (
    <span
      onClick={handleClick}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 cursor-pointer material-symbols-outlined hover:text-pmsf" 
    >
      {visible ? 'visibility' : 'visibility_off'}
    </span>
  )
}