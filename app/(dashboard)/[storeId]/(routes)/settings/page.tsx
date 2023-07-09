import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";
import Container from "@/components/container";

const Settings = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <Container>
      <SettingsForm initialData={store} />
    </Container>
  );
};

export default Settings;
