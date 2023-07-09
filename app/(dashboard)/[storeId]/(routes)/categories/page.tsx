import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
const CategoriesPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading
          title="Categories (0)"
          description="Manage categories for your store"
        />
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
    </Container>
  );
};

export default CategoriesPage;
