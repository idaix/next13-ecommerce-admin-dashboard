import Container from "@/components/container";
import Client from "./components/client";
import prismadb from "@/lib/prismadb";
import { Color } from "./components/columns";
import { format } from "date-fns";
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: Color[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <Container>
      <Client data={formattedColors} />
    </Container>
  );
};

export default CategoriesPage;
