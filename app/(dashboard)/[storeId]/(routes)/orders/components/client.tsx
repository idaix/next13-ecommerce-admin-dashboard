"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Order, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ClientProps {
  data: Order[];
}

const Client: React.FC<ClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default Client;
