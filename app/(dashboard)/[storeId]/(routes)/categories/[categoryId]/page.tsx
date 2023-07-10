import Container from "@/components/container";
import { auth } from "@clerk/nextjs";
import { useId } from "react";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const BillboardAction = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const { userId } = auth();

  if (!useId) {
    redirect("/sign-in");
  }

  if (!params.categoryId) {
    redirect("/");
  }

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <Container>
      <CategoryForm billboards={billboards} initialData={category} />
    </Container>
  );
};

export default BillboardAction;
