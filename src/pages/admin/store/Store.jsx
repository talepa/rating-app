import axios from "axios";
import { useEffect, useState } from "react";
import AuthHOC from "../../../AuthHOC";
import roles from "../../../utils/roles";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet-async";
import Icons from "../../../Icons/Icons";
import ICONTYPES from "../../../Icons/types";
const StoreDisplay = () => {
  const select = "border rounded-lg p-3";
  const select_container = "flex gap-3 items-center justify-between";
  const [storesList, setStoresList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    "arrange-by": "name",
    "sort-by": "ascending",
  });
  function filterHandler(e, name) {
    setFilter((prev) => ({ ...prev, [name]: e.target.value }));
  }
  async function getStoresList() {
    setIsLoading(true);
    const result = await axios.post(store_url["store-list"], {
      test: "test",
    });
    setStoresList(result.data.storesList);
    setIsLoading(false);
  }
  useEffect(() => {
    getStoresList();
  }, []);

  useEffect(() => {
    async function filterStoresList() {
      const result = await axios.post(store_url["store-list"], {
        ...filter,
      });
      setStoresList(result.data.storesList);
    }
    filterStoresList();
  }, [filter]);

  return (
    <>
      <Helmet>
        <title>Stores List</title>
        <meta name="description" content="Stores List" />
      </Helmet>
      <div>
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
              <option value={"overall_rating"}>Rating</option>
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
        </div>
        <div className="overflow-auto h-[70vh] p-5 justify-center flex">
          {isLoading ? (
            <div className="h-screen max-h-72 grid place-items-center">
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
                  <th>Store Name</th>
                  <th>Overall Rating</th>
                </tr>
              </thead>
              <tbody>
                {storesList.length > 0 &&
                  storesList.map((store, index) => {
                    const {
                      name,
                      email,
                      store_name,
                      overall_rating,
                      _id,
                      address,
                      role,
                    } = store;

                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>
                          {role == roles.ADMIN
                            ? "System Admin"
                            : role == roles.STOREOW
                            ? "Store Owner"
                            : "Normal User"}
                        </td>
                        <td>{address}</td>
                        <td>{email}</td>
                        <td>{store_name}</td>
                        <td>{overall_rating.toFixed(1)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthHOC(StoreDisplay);
