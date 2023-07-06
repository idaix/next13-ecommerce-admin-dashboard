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

  return <div className="p-3">Hello {store?.name}</div>;
};

export default DashboardPage;
