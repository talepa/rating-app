import { Rating, RoundedStar } from "@smastrom/react-rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthHOC from "../../../AuthHOC";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet-async";
import Icons from "../../../Icons/Icons";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};
const StoreDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const { user } = useSelector((state) => state.userData);
  const { name, email } = user;

  useEffect(() => {
    async function getStoreStats() {
      setIsLoading(true);
      const result = await axios.post(store_url["store-stats"], {
        name,
        email,
      });
      setOverallRating(result.data.rating);
      setUsersList(result.data.userList);
      setIsLoading(false);
    }
    if (email) getStoreStats();
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="View your store details" />
      </Helmet>
      {isLoading && (
        <div className=" min-h-[inherit] grid place-items-center">
          <Icons type={"loader"} color="black" size="3em" />
        </div>
      )}
      {!isLoading && (
        <div className="min-h-[inherit] grid grid-cols-1 md:grid-cols-2 gap-5 p-7">
          <div className="p-5 shadow-xl rounded-lg bg-white flex flex-col items-center justify-center">
            <div className=" text-3xl md:text-5xl font-bold">
              Overall Rating
            </div>
            <div className="flex items-center justify-center mt-5">
              <Rating
                style={{ maxWidth: 150 }}
                value={overallRating}
                itemStyles={myStyles}
                radius="small"
                readOnly
              />
            </div>
          </div>
          <div className="p-5 shadow-xl rounded-lg bg-white">
            <div className=" text-3xl text-center md:text-left md:text-5xl font-bold mb-5">
              User Ratings
            </div>
            <div className="flex flex-col gap-5">
              {usersList.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="flex flex-col justify-center items-center gap-1 border p-1 rounded-lg bg-white shadow-md hover:scale-105 transition duration-300"
                  >
                    <div className="font-semibold"> {user.user_name}</div>
                    <div className="flex items-center justify-center">
                      <Rating
                        style={{ maxWidth: 150 }}
                        value={user.rating}
                        itemStyles={myStyles}
                        radius="small"
                        readOnly
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthHOC(StoreDashboard);
