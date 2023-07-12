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
      <Heading title="Dashboard" description="Overview of your store" />
      <div className="w-full h-full grid place-content-center">
        <p className="text-gray-500 text-3xl">This part not ready!</p>
      </div>
    </Container>
  );
};

export default DashboardPage;
