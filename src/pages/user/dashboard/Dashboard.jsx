import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import AuthHOC from "../../../AuthHOC";
import Input from "../../../components/UI/FormComponents/Input/Input";
import Popup from "./Popup";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet-async";
import Icons from "../../../Icons/Icons";
import ICONTYPES from "../../../Icons/types";
import StoreCard from "./StoreCard";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const UserDashboard = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [popupInfo, setPopupInfo] = useState({
    name: "",
    store_name: "",
    email: "",
    address: "",
    overall_rating: 0,
  });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const getStoresList = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(store_url["store-list"], {
          test: "test",
        });
        setStoreList(data.storesList);
      } catch (error) {
        console.error("Error fetching store list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getStoresList();
  }, []);

  const filteredStoreList = useMemo(() => {
    if (!debouncedSearch) return storeList;

    return storeList.filter(({ name, address, store_name }) =>
      [name, address, store_name].some((field) =>
        field.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch, storeList]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Browse through our list of stores" />
      </Helmet>
      <div className="min-h-[inherit]">
        <div className="p-5 flex justify-center items-center">
          <Input
            className="max-w-96"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="p-5 flex justify-center items-start">
          {isLoading ? (
            <Icons type={ICONTYPES.LOADER} color="black" size="5em" />
          ) : (
            <div className="grid grid-cols-1 gap-5 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl">
              {filteredStoreList.map((store) => (
                <StoreCard
                  key={store.name}
                  {...store}
                  setPopupInfo={setPopupInfo}
                />
              ))}
            </div>
          )}
          {popupInfo?.name && <Popup {...popupInfo} close={setPopupInfo} />}
        </div>
      </div>
    </>
  );
};

export default AuthHOC(UserDashboard);
