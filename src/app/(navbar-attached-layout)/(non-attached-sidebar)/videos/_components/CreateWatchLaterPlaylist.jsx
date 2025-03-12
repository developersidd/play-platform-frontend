"use client";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters long",
    })
    .max(20, {
      message: "Name must be at most 20 characters long",
    }),
});

const CreateWatchLaterPlaylist = () => {
  const { apiClient } = useAxios();

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { formState, reset } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      const res = await apiClient.post("/playlists", {
        name: data?.name,
        type: "watchLater",
      });
      router.refresh();
      reset();
      console.log(" res:", res);
    } catch (error) {
      console.log(" error:", error);
    }
  };

  return (
    <div className="mt-4 flex flex-col">
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

export default CreateWatchLaterPlaylist;
