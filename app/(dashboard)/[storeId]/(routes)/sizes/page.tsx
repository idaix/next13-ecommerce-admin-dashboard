import Container from "@/components/container";
import Client from "./components/client";
import prismadb from "@/lib/prismadb";
import { Size } from "./components/columns";
import { format } from "date-fns";
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: Size[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <Container>
      <Client data={formattedSizes} />
    </Container>
  );
};

export default CategoriesPage;
