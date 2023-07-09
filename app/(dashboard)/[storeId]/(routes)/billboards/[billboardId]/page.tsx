import Container from "@/components/container";
import { auth } from "@clerk/nextjs";
import { useId } from "react";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form ";

const BillboardAction = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const { userId } = auth();
  if (!useId) {
    redirect("/sign-in");
  }
  if (!params.billboardId) {
    redirect("/");
  }
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <Container>
      <BillboardForm initialData={billboard} />
    </Container>
  );
};

export default BillboardAction;
