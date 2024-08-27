import { useState, useEffect } from "react";
import roles from "../../../../utils/roles";
import store_url from "../../../../utils/store-urls";
import Icons from "../../../../Icons/Icons";
import ICONTYPES from "../../../../Icons/types";
import axios from "axios";
const ViewUsers = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState({
    "arrange-by": "name",
    "sort-by": "ascending",
    role: "all",
  });

  function filterHandler(e, name) {
    setFilter((prev) => ({ ...prev, [name]: e.target.value }));
  }

  const select = "border rounded-lg p-3";
  const select_container = "flex gap-3 items-center justify-between";
  const [userList, setUserList] = useState([]);

  async function getUsersList() {
    setIsLoading(true);
    const res = await axios.post(store_url["user-list"], {
      filter: "ascending",
    });
    setUserList(res.data.usersList);
    setIsLoading(false);
  }

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function filterUserData() {
      const result = await axios.post(store_url["user-list"], {
        ...filter,
      });
      setUserList(result.data.usersList);
      setIsLoading(false);
    }
    filterUserData();
  }, [filter]);
  return (
    <div className="relative">
      <div className="filter p-4 md:h-20 border flex flex-col items-center gap-5 md:gap-0 md:flex-row md:justify-around md:items-center">
        <div className={`${select_container}`}>
          <label htmlFor="arrange-by">Arrange By</label>
          <select
            value={filter["arrange-by"]}
            onChange={(e) => filterHandler(e, "arrange-by")}
            className={select}
            id="arrange-by"
          >
            <option value={"name"}>Name</option>
            <option value={"email"}>Email</option>
            <option value={"address"}>Address</option>
          </select>
        </div>
        <div className={select_container}>
          <label htmlFor="sort-by">Sort By</label>
          <select
            value={filter["sort-by"]}
            onChange={(e) => filterHandler(e, "sort-by")}
            className={select}
            id="sort-by"
          >
            <option value={"ascending"}>Ascending</option>
            <option value={"descending"}>Descending</option>
          </select>
        </div>
        <div className={select_container}>
          <label htmlFor="select-role">Select Role</label>
          <select
            value={filter["role"]}
            onChange={(e) => filterHandler(e, "role")}
            className={select}
            id="select-role"
          >
            <option value={"all"}>All</option>
            {Object.values(roles).map((val) => {
              const role_name =
                val === roles.ADMIN
                  ? "System Admin"
                  : val === roles.STOREOW
                  ? "Store Owner"
                  : "Normal User";
              return (
                <option key={val} value={val}>
                  {role_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="overflow-auto h-[70vh] p-5 justify-center flex">
        {isLoading ? (
          <div className=" h-screen max-h-96 grid place-items-center">
            <Icons type={ICONTYPES.LOADER} size="5em" />
          </div>
        ) : (
          <table>
            <thead className="">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Address</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 &&
                userList.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.role === roles.ADMIN
                        ? "System Admin"
                        : user.role === roles.STOREOW
                        ? "Store Owner"
                        : "Normal User"}
                    </td>
                    <td>{user.address}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
