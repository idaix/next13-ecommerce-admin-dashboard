import Container from "@/components/container";
import Heading from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";

interface DashboardParams {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardParams> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <Container>
      <Heading title="Dashboard" description="Overview of your store" />{" "}
    </Container>
  );
};

export default DashboardPage;
