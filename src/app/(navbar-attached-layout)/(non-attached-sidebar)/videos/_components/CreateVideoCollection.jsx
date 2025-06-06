import useAxios from "@/hooks/useAxios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters long",
    })
    .max(70, {
      message: "Name must be at most 70 characters long",
    }),
});

const CreateVideoCollection = ({ setCollections }) => {
  const { apiClient } = useAxios();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { formState, reset } = form;
  const { isSubmitting } = formState;

  const onSubmit = async ({ name }) => {
    try {
      const { data: { data } = {} } =
        (await apiClient.post("/playlists", {
          name,
          type: "collection",
        })) || {};
      setCollections((prev) => [...prev, data]);
      reset();
    } catch (error) {
      if (
        error?.response?.data?.message?.startsWith("E11000 duplicate key error")
      ) {
        return toast.info("Collection with same name already exists");
      }
      toast.error("Failed to create collection");
    }
  };

  return (
    <div className="mt- flex flex-col">
      <Form {...form}>
        <form className="space-y-3 " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            className="grid gap-2"
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter playlist name"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center text-center disabled:cursor-not-allowed mx-auto mt-4 rounded-lg bg-secondary px-4 text-background font-medium py-2 "
          >
            Create new playlist
          </button>
        </form>
      </Form>
    </div>
  );
};

export default CreateVideoCollection;
