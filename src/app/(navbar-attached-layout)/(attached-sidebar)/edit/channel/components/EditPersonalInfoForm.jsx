"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  fullName: z
    .string()
    .min(3, {
      message: "Full Name must be at least 3 characters long",
    })
    .max(40, {
      message: "Full Name must be at most 40 characters long",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .max(60, {
      message: "Email must be at most 60 characters long",
    }),
});

const EditPersonalInfoForm = () => {
  const { state } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    ["email", "username", "fullName"].forEach((key) => {
      form.setValue(key, state[key]);
    });
  }, [state?._id]);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { privateApi } = useAxios();
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    try {
      const response = await privateApi.patch(
        "/api/v1/users/update-account",
        data
      );
      toast.success("Account updated successfully!");
      console.log("response:", response);
      router.refresh();
    } catch (e) {
      toast.error("There was an error occurred!");
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-[65%]">
      <div className="rounded-lg border">
        <Form {...form}>
          <form className="flex flex-wrap gap-y-4 p-4">
            <div className="w-full lg:w-1/2 lg:pl-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]"> Full Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="fullName"
                        placeholder="Enter first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full lg:w-1/2 lg:pl-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]"> User Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        id="username"
                        placeholder="Enter first name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full lg:pl-2">
              <FormLabel className="text-[15px]"> Email Address </FormLabel>
              <div className="relative">
                <div className="absolute left-3 top-2 h-5 w-5  text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    ></path>
                  </svg>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl>
                        <Input
                          className="pl-9"
                          placeholder="Enter your email address"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

export default EditPersonalInfoForm;
