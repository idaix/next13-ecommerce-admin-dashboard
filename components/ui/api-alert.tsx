"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CopyIcon, ServerIcon } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<
  ApiAlertProps["variant"],
  "secondary" | "destructive"
> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({ description, title, variant }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard.");
  };
  return (
    <Alert className="w-full">
      <ServerIcon className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center mt-4 justify-between gap-x-2">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-xm sm:text-sm text-gray-600 overflow-x-auto">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <CopyIcon className="w-h h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
