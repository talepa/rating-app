import axios from "axios";
import { useEffect, useState } from "react";
import AuthHOC from "../../../AuthHOC";
import store_url from "../../../utils/store-urls";
import { Helmet } from "react-helmet-async";
import Icons from "../../../Icons/Icons";
import ICONTYPES from "../../../Icons/types";
const DashboardCard = ({ heading, number }) => {
  return (
    <div className="bg-white w-full max-w-96 h-full overflow-hidden rounded-3xl flex flex-col gap-4 hover:scale-105 transition relative ">
      {heading === "Total Users" && (
        <Icons
          color="green"
          type={ICONTYPES.USERS}
          className="w-full"
          size="7em"
        />
      )}
      {heading === "Total Stores" && (
        <Icons
          color="blue"
          type={ICONTYPES.STORE}
          className="w-full"
          size="7em"
        />
      )}
      {heading === "Total Ratings" && (
        <Icons
          color="gold"
          type={ICONTYPES.STAR}
          className="w-full"
          size="7em"
        />
      )}
      <div className="p-8 text-4xl font-bold w-full flex flex-col gap-3">
        <div className="">{heading}:</div>
        <div className="">{number}</div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({
    usersCount: 0,
    storesCount: 0,
    submittedRatings: 0,
  });

  useEffect(() => {
    async function getCounts() {
      setIsLoading(true);
      const result = await axios.get(store_url["admin-stats"]);
      setCounts(result.data.counts);
      setIsLoading(false);
    }
    getCounts();

    const intervalId = setInterval(() => {
      getCounts();
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
      </Helmet>
      <div className="min-h-[inherit] flex flex-col lg:flex-row justify-center items-center gap-7 p-7 text-center">
        {isLoading && (
          <Icons
            type={ICONTYPES.LOADER}
            className="fixed left-[10%] bottom-[10%] "
            color="black"
            size="3em"
          />
        )}

        <DashboardCard heading={"Total Users"} number={counts.usersCount} />
        <DashboardCard heading={"Total Stores"} number={counts.storesCount} />
        <DashboardCard
          heading={"Total Ratings"}
          number={counts.submittedRatings}
        />
      </div>
    </>
  );
};

export default AuthHOC(AdminDashboard);
