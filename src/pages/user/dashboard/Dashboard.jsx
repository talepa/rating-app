import { Rating, RoundedStar } from "@smastrom/react-rating";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import AuthHOC from "../../../AuthHOC";
import Input from "../../../components/UI/FormComponents/Input/Input";
import Loader from "../../../components/UI/Icons/Loader";
import Popup from "./Popup";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const UserDashboard = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [filterstoreList, setFilterStoreList] = useState([]);
  const [popupInfo, setPopupInfo] = useState({
    name: "",
    store_name: "",
    email: "",
    address: "",
    overall_rating: 0,
  });

  useEffect(() => {
    setFilterStoreList(storeList);
  }, [storeList]);

  useEffect(() => {
    setIsLoading(true);
    async function getStoresList() {
      const result = await axios.post(store_url["store-list"], {
        test: "test",
      });
      setStoreList(result.data.storesList);
      setIsLoading(false);
    }
    getStoresList();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (search) {
        const temp = storeList.filter((store) => {
          return (
            store.name.toLowerCase().includes(search) ||
            store.address.toLowerCase().includes(search) ||
            store.store_name.toLowerCase().includes(search)
          );
        });
        setFilterStoreList(temp);
      } else {
        setFilterStoreList(storeList);
      }
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [search]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Browse through our list of stores" />
      </Helmet>
      <div className="min-h-[inherit]">
        <div className=" p-5 flex justify-center items-center ">
          <Input
            className="max-w-96"
            label={"Search"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="  p-5 flex border justify-center items-start ">
          {isLoading && (
            <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center z-50 bg-black/80">
              <Loader color="white" size="3em" />
            </div>
          )}
          {popupInfo.name && <Popup {...popupInfo} close={setPopupInfo} />}
          <div className=" grid grid-cols-1 gap-2 place-items-center sm:grid-cols-2 md:grid-cols-3 max-w-6xl ">
            {filterstoreList.map((store) => {
              const { name, email, store_name, overall_rating, address } =
                store;
              return (
                <div
                  key={name}
                  className="bg-white shadow-md border w-fit h-fit p-7 rounded-xl flex flex-col gap-3 max-w-[300px] max-h-[500px]"
                >
                  <div className="image">
                    <img
                      className="rounded-xl"
                      src={"/store3d.jpg"}
                      alt="store image"
                      height={200}
                      width={300}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold line-clamp-1">
                      {store_name}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-1">{name}</p>
                  </div>
                  <div>
                    <p className=" text-lg">Address</p>
                    <p className="text-gray-400 line-clamp-1">{address}</p>
                  </div>
                  <div>
                    <p className=" text-lg">Rating</p>
                    <Rating
                      style={{ maxWidth: 150 }}
                      value={overall_rating}
                      itemStyles={myStyles}
                      radius="small"
                      readOnly
                    />
                  </div>
                  <button
                    onClick={() => {
                      setPopupInfo(store);
                    }}
                    className="p-3 text-center w-full bg-black text-white rounded-xl"
                  >
                    Rate this store
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthHOC(UserDashboard);
