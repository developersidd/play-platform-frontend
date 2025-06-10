import { Upload } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "../../ui/form";

const UploadVideoForm = ({
  form,
  videoFile,
  setVideoFile,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  dragging,
}) => {
  return (
    <FormField
      control={form.control}
      name="videoFile"
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormControl>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full border-2 border-dashed px-4 mb-3 py-12 text-center cursor-drop ${
                dragging ? "border-purple-500" : ""
              }`}
            >
              <span className="mb-4 inline-block  rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                <Upload size={35} />
              </span>
              {
                // Show video file name if selected
                videoFile?.name && (
                  <p className="mb-2 ">
                    {" "}
                    Selected File:{" "}
                    <span className="font-semibold">{value?.name} </span>{" "}
                  </p>
                )
              }
              <h6 className="mb-2 font-semibold">
                Drag and drop video files to upload
              </h6>
              <p className="text-gray-400">
                Your videos will be private untill you publish them.
              </p>

              <label
                for="upload-video"
                className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                <input
                  onChange={(e) => {
                    const file = e.target?.files && e.target.files[0];
                    setVideoFile(file);
                    onChange(file);
                  }}
                  {...fieldProps}
                  type="file"
                  accept="video/mp4, video/mp3"
                  id="upload-video"
                  className="sr-only"
                />
                Select Files
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadVideoForm;
