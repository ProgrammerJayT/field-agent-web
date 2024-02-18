// QueryContext.js
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { getCustomers } from "../../services/server/customers/getCustomers";

const QueryContext = createContext();

export const useQueryContext = () => useContext(QueryContext);

export const QueryProvider = ({ children }) => {
  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const invalidateCustomersQuery = () => {
    //
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
        customersQuery,

        //methods
        invalidateCustomersQuery,
        invalidateOrdersQuery,
        invalidateProductsQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
