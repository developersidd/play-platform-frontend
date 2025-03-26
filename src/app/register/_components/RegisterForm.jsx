"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { apiClient } from "@/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
function checkFileType(file) {
  //console.log("file:", file);
  if (file?.name) {
    const fileType = file?.name?.split(".")?.pop();
    //console.log("fileType:", fileType);
    const allowedTypes = ["png", "jpg", "jpeg"];
    if (allowedTypes.includes(fileType)) return true;
  }
  return false;
}

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
  avatar: z
    .any()
    .refine((file) => file, "File is required")
    .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file),
      "Only .png, .jpg, .jpeg formats are supported."
    ),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

function RegisterForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      fullName: "",
      avatar: undefined,
    },
  });
  //const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    console.log("data:", data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    //console.log(Object.fromEntries(formData.entries()));
    try {
      await apiClient.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //console.log("response:", response);
      router.push("/login");
    } catch (e) {
      console.log("e:", e);
      toast.error("There was an error occurred!");
    }
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-secondary">Register</CardTitle>
        <CardDescription>
          Enter your email below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              className="grid gap-2"
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username </FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="grid gap-2"
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FullName </FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="grid gap-2"
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              className="grid gap-2"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password </FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="grid gap-2"
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Avatar </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              //disabled={isSubmitting}
              type="submit"
              className="w-full bg-secondary"
            >
              Register
            </Button>
            {/*</div>*/}
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <p>
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
export default RegisterForm;
