import axios from "axios";
import { useEffect, useState } from "react";
import AuthHOC from "../../../AuthHOC";
import Loader from "../../../components/UI/Icons/Loader";
import store_url from "../../../utils/store-urls";

const DashboardCard = ({ heading, number }) => {
  return (
    <div className="bg-white border w-full h-full max-w-[300px] max-h-56 p-8 rounded-3xl shadow-xl flex flex-col gap-4">
      <div className="text-4xl">{heading}</div>
      <div className="text-xl">{number}</div>
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
      <div className="min-h-[inherit] flex flex-col lg:flex-row justify-center items-center gap-7 p-7 text-center">
        {isLoading ? (
          <Loader color="black" size="3em" />
        ) : (
          <>
            <DashboardCard heading={"Total Users"} number={counts.usersCount} />
            <DashboardCard
              heading={"Total Stores"}
              number={counts.storesCount}
            />
            <DashboardCard
              heading={"Total Ratings"}
              number={counts.submittedRatings}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AuthHOC(AdminDashboard);
