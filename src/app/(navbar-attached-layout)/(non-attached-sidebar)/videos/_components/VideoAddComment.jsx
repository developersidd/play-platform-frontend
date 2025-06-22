"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Comment must be at least 1 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 30 characters.",
    }),
});

function VideoAddComment({ videoId }) {
  const { state } = useUserContext();
  const { apiClient } = useAxios();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    if (!state?._id) {
      return toast.error("You must be logged in to comment!");
    }
    try {
      const { content } = data;
      await apiClient.post(`/comments/add/v/${videoId}/`, {
        content,
      });
      router.refresh();
      form.reset();
    } catch (error) {
      toast.error("There was an error occurred!");
    } finally {
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3 mt-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add Comment"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting || !state?._id} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
export default VideoAddComment;
