import Container from "@/components/container";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const BillboardAction = async ({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!params.sizeId) {
    redirect(`/${params.storeId}/sizes`);
  }

  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <Container>
      <CategoryForm initialData={size} />
    </Container>
  );
};

export default BillboardAction;
