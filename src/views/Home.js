import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../services/server/auth/getLoggedInUser";
import FullscreenLoader from "../components/FullscreenLoader";
import { checkUser } from "../utils/middleware/checkUser";
import { useNavigate } from "react-router-dom";
import CustomerList from "./customer/CustomerList";

const Home = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getLoggedInUser(),
    enabled: authChecked, // Only fetch when authChecked is true
  });

  useEffect(() => {
    const onCheckUser = async () => {
      const isUser = await checkUser();
      console.log("Is user", isUser);

      if (!isUser) {
        setTimeout(() => {
          return navigate("/auth/login");
        }, 5000);
      }

      setAuthChecked(true);
    };

    onCheckUser();
  }, [navigate]);

  if (userQuery.isError) {
    // Error occurred while fetching user data
    return <div>Error fetching user data</div>;
  }

  // User data successfully fetched, you can now access userQuery.data
  // console.log("User response", userQuery.data);

  return (
    <div style={{}}>
      {(!authChecked || userQuery.isLoading) && <FullscreenLoader />}

      <CustomerList />
    </div>
  );
};

export default Home;
