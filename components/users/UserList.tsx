"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside
      className="
        fixed
        inset-y-0
        pb-20 lg:pb-0
        lg:left-20
        lg:w-80
        overflow-y-auto
        lg:block w-full left-0
      "
    >
      <div className="px-5">
        <div className="flex flex-col justify-center mb-4 pt-4">
          <div className=" text-2xl font-bold text-neutral-200">
            People
          </div>
        </div>
        {items.map((item) => {
          return <UserBox key={item.id} data={item} />;
        })}
      </div>
    </aside>
  );
};

export default UserList;
