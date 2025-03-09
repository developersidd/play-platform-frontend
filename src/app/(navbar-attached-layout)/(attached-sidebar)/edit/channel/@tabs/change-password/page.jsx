import ChangePasswordForm from "./_components/ChanePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-wrap justify-between gap-y-4 py-7">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[30%]">
        <h5 className="font-semibold">Channel Info</h5>
        <p className="text-gray-300">Update your Channel details here.</p>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
