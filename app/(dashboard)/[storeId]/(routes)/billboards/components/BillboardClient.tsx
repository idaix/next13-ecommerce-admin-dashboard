"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface BillboardClientProps {
  data: Billboard[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
