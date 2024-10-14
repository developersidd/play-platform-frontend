"use client";
import { Form } from "@/components/ui/form";
import useAxios from "@/hooks/useAxios";
import useUserContext from "@/hooks/useUserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ChangePassordField from "./ChangePassordField";
const formSchema = z.object({
  currentPassword: z
    .string()
    .min(5, {
      message: "Password must be at least 8 characters long",
    })
    .max(60, {
      message: "Password must be at most 60 characters long",
    }),
  newPassword: z
    .string()
    .min(8, {
      message: "New password must be at least 8 characters long",
    })
    .max(60, {
      message: "New password must be at most 60 characters long",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Confirm password must be at least 8 characters long",
    })
    .max(60, {
      message: "Confirm password must be at most 60 characters long",
    }),
});

const inputFields = [
  {
    label: "Current Password",
    placeholder: "Enter current password",
    name: "currentPassword",
  },
  {
    label: "New Password",
    placeholder: "Enter new password",
    name: "newPassword",
  },
  {
    label: "Confirm Password",
    placeholder: "Confirm new password",
    name: "confirmPassword",
  },
];

const ChangePasswordForm = () => {
  const { state } = useUserContext();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { privateApi } = useAxios();
  const { isSubmitting } = form.formState;
  async function onSubmit(data) {
    const { currentPassword, newPassword, confirmPassword } = data || {};
    if (newPassword !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const response = await privateApi.post("/api/v1/users/change-password", {
        currentPassword,
        newPassword,
      });
      form.reset();
      toast.success("Account updated successfully!");
      console.log("response:", response);
      router.refresh();
    } catch (e) {
      const errorMessage = e?.response?.data?.message;
      toast.error(errorMessage || "There was an error occurred!");
    }
  }

  return (
    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-[58%]">
      <div className="rounded-lg border">
        <Form {...form}>
          <form className="flex flex-wrap gap-y-4 p-4">
            {inputFields.map((item) => (
              <ChangePassordField key={item.name} item={item} form={form} />
            ))}
          </form>
        </Form>
        <hr className="border border-gray-300" />
        <div className="flex items-center justify-end gap-4 p-4">
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

export default ChangePasswordForm;
