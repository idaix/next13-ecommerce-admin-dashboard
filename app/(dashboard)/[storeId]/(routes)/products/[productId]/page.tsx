import Container from "@/components/container";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import ProductsForm from "./components/products-form";

const ProductActionPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (!params.productId) {
    redirect(`${params.storeId}/${params.productId}`);
  }

  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <Container>
      <ProductsForm
        initialData={product}
        categories={categories}
        colors={colors}
        sizes={size}
      />
    </Container>
  );
};

export default ProductActionPage;
