import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../services/server/auth/getLoggedInUser";
import FullscreenLoader from "../components/FullscreenLoader";
import { checkUser } from "../utils/middleware/checkUser";
import { useNavigate } from "react-router-dom";
import CustomerList from "./customer/CustomerList";
import { getCustomers } from "../services/server/customers/getCustomers";

const Home = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getLoggedInUser(),
    enabled: authChecked, // Only fetch when authChecked is true
  });

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
    enabled: userQuery.data?.user ? true : false,
  });

  console.log("Customers", customersQuery.data);

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
    return <div>Error fetching user data</div>;
  }

  return (
    <div style={{}}>
      {(!authChecked || userQuery.isLoading || customersQuery.isLoading) && (
        <FullscreenLoader />
      )}

      <CustomerList />
    </div>
  );
};

export default Home;
