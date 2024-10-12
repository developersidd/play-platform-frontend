import EditPersonalInfoForm from "../components/EditPersonalInfoForm";

const EditPersonalInfoPage = () => {
  return (
    <div class="flex flex-wrap justify-between gap-y-4 py-7">
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-[40%]">
        <h5 class="font-semibold">Personal Info</h5>
        <p class="text-gray-300">Update your photo and personal details.</p>
      </div>
      <EditPersonalInfoForm />
    </div>
  );
};

export default EditPersonalInfoPage;
