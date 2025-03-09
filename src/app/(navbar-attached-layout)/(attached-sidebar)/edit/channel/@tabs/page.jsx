import EditPersonalInfoForm from "../components/EditPersonalInfoForm";

const EditPersonalInfoPage = () => {
  return (
    <div className="flex flex-wrap justify-between gap-y-4 py-7">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[35%]">
        <h5 className="font-semibold">Personal Info</h5>
        <p className="text-gray-300">Update your photo and personal details.</p>
      </div>
      <EditPersonalInfoForm />
    </div>
  );
};

export default EditPersonalInfoPage;
