import axios from "axios";
import BillboardClient from "./components/BillboardClient";
import Container from "@/components/container";
import prismadb from "@/lib/prismadb";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Container>
      <BillboardClient data={billboards} />
    </Container>
  );
};

export default BillboardPage;
