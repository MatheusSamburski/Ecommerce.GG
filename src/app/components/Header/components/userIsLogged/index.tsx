import { RiArrowDropDownLine } from "react-icons/ri";

export function UserIsLogged({ username }: any) {
  return (
    <div className="user-logged">
      <span>{username.name}</span>
      <RiArrowDropDownLine size={22} />
    </div>
  );
}
