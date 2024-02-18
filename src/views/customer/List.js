import React from "react";
import CustomersTableComponent from "../../components/data-display/table/CustomersTable";
import { useQueryClient } from "@tanstack/react-query";

export default function CustomerList() {
  const queryClient = useQueryClient();
  const customers = queryClient.getQueryData(["customers"]);

  return <CustomersTableComponent customers={customers} />;
}
