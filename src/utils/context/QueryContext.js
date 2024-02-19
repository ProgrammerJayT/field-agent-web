// QueryContext.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCustomers } from "../../services/server/customers/getCustomers";
import { getLoggedInUser } from "../../services/server/auth/getLoggedInUser";
import { getCustomersViews } from "../../services/server/customers/getCustomersViews";
import { getCustomer } from "../../services/server/customers/getCustomer";

const QueryContext = createContext();

export const useQueryContext = () => useContext(QueryContext);

export const QueryProvider = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("Auth was checked", authChecked);
  }, [authChecked]);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
    enabled: authChecked,
  });

  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    enabled: authChecked && userQuery.data != null,
  });

  const useCustomerQuery = (id) => {
    return useQuery({
      queryKey: ["customer", id],
      queryFn: () => getCustomer(id),
    });
  };

  const customersViewsQuery = useQuery({
    queryKey: ["customersViews"],
    queryFn: getCustomersViews,
    enabled: authChecked && userQuery.data != null,
  });

  const invalidateCustomersQuery = () => {
    queryClient.invalidateQueries(["customers"], { exact: true });
  };

  const invalidateCustomersViewsQuery = (views) => {
    queryClient.invalidateQueries(["customersViews"], { exact: true });
    queryClient.setQueryData(["customersViews"], views);
  };

  const invalidateOrdersQuery = () => {
    //
  };

  const invalidateProductsQuery = () => {
    //
  };

  return (
    <QueryContext.Provider
      value={{
        //variables
        userQuery,
        authChecked,
        customersQuery,
        customersViewsQuery,

        //methods
        setAuthChecked,
        useCustomerQuery,
        invalidateOrdersQuery,
        invalidateProductsQuery,
        invalidateCustomersQuery,
        invalidateCustomersViewsQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
