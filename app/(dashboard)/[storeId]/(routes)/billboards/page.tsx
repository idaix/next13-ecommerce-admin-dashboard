import BillboardClient from "./components/client";
import Container from "@/components/container";
import prismadb from "@/lib/prismadb";
import { Billboard } from "./components/columns";
import { format } from "date-fns";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: Billboard[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Container>
      <BillboardClient data={formattedBillboards} />
    </Container>
  );
};

export default BillboardPage;
