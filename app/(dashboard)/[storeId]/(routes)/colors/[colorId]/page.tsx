import Container from "@/components/container";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const ActionPage = async ({
  params,
}: {
  params: { colorId: string; storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!params.colorId) {
    redirect(`/${params.storeId}/colors`);
  }

  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <Container>
      <CategoryForm initialData={color} />
    </Container>
  );
};

export default ActionPage;
