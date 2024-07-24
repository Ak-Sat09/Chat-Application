import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  console.log(allUsers);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <h1 className="px-6 py-3 text-gray-900 font-semibold bg-gray-200 rounded-lg shadow-md mb-4">
        Messages
      </h1>
      <div
        className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.length ? (
          allUsers.map((user, index) => (
            <User key={index} user={user} />
          ))
        ) : (
          <div className="p-4 text-gray-700 text-center">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
