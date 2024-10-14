import ChangePasswordForm from "./_components/ChanePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div class="flex flex-wrap justify-between gap-y-4 py-7">
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-[30%]">
        <h5 class="font-semibold">Channel Info</h5>
        <p class="text-gray-300">Update your Channel details here.</p>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
