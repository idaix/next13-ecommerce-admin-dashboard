"use client";

import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import UploadImage from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  label: z.string().min(3).max(50),
  imageUrl: z.string().min(1),
});

type BillboardValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const toastMessage: string = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const title: string = initialData ? "Edit billboard" : "Create created.";
  const description: string = initialData
    ? "Edit a billboard"
    : "Add a new billboard.";
  const action: string = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillboardValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${initialData.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      console.log("BILLBOARD_CREATE_UPDATE", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${initialData?.id}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted.");
    } catch (error) {
      console.log("BILLBOARD_DELETE", error);
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <UploadImage
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    disabled={loading}
                    values={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="label"
            control={form.control}
            render={({ field }) => (
              <FormItem className="max-w-sm">
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Billboard name like Shoes, Suits..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
