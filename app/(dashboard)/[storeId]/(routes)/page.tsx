import Container from "@/components/container";
import Loader from "@/components/ui/Loader/loader";
import Heading from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";

interface DashboardParams {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardParams> = async ({ params }) => {
  return (
    <Container>
      <Heading title="Dashboard" description="Overview of your store" />
      <div className="w-full h-full grid place-content-center gap-y-10 py-20">
        <Loader />
        <p className="text-gray-500 text-sm">This part not ready!</p>
      </div>
    </Container>
  );
};

export default DashboardPage;
