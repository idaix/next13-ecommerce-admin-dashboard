import Client from "./components/client";
import Container from "@/components/container";
import prismadb from "@/lib/prismadb";
import { Product } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const product = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: Product[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    color: item.color.value,
    size: item.size.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Container>
      <Client data={formattedProducts} />
    </Container>
  );
};

export default BillboardPage;
