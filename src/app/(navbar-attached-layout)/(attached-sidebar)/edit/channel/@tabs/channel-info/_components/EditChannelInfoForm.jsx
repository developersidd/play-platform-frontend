"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(25, {
      message: "Username must be at most 25 characters long",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters long",
    })
    .max(200, {
      message: "Description must be at most 200 characters long",
    }),
});

const EditChannelInfoForm = () => {
  const {
    state: { username, description, email },
  } = useUserContext();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("username", username);
    form.setValue("description", description);
    form.setValue("email", email);
  }, [username, description, email, form]);

  const { apiClient } = useAxios();
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    console.log("data:", data);
    try {
      const response = await apiClient.patch("/users/update-account", data);
      toast.success("Channel updated successfully!");
      console.log("response:", response);
      router.refresh();
    } catch (e) {
      toast.error("There was an error occurred!");
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-[70%]">
      <div className="rounded-lg border">
        <Form {...form}>
          <form className="flex flex-wrap gap-y-4 p-4">
            <div class="w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]"> User Name </FormLabel>
                    <FormControl>
                      <div class="flex rounded-lg border">
                        <p class="flex shrink-0 items-center focus-within:ring-white border-r border-white px-3 align-middle">
                          vidplay.com/
                        </p>

                        <input
                          {...field}
                          type="text"
                          class="w-full bg-transparent px-2 py-1.5"
                          id="username"
                          placeholder="@username"
                        ></input>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]"> Description </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        class="w-full rounded-lg border bg-transparent px-2 py-1.5"
                        rows="4"
                        id="desc"
                        placeholder="Channel Description"
                      >
                        {field.value}
                      </Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <hr className="border border-gray-300" />
        <div className="flex items-center justify-end gap-4 p-4">
          <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            onClick={() => {
              form.handleSubmit(onSubmit)();
            }}
            className="rounded inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChannelInfoForm;
