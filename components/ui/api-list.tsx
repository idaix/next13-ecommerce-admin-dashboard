"use client";

import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityId: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityId, entityName }) => {
  const params = useParams();
  const origin = useOrigin();
  const BASEURL = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        variant="public"
        title="GET"
        description={`${BASEURL}/${entityName}`}
      />
      <ApiAlert
        variant="public"
        title="GET"
        description={`${BASEURL}/${entityName}/<${entityId}>`}
      />
      <ApiAlert
        variant="admin"
        title="POST"
        description={`${BASEURL}/${entityName}`}
      />
      <ApiAlert
        variant="admin"
        title="PATCH"
        description={`${BASEURL}/${entityName}/<${entityId}>`}
      />
      <ApiAlert
        variant="admin"
        title="DELETE"
        description={`${BASEURL}/${entityName}/<${entityId}>`}
      />
    </>
  );
};

export default ApiList;
