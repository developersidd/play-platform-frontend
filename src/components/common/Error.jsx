import { MessageSquareWarning } from "lucide-react";

const Error = ({ title, classes }) => {
  return (
    <div className={`flex justify-center w-full  p-4 items-center ${classes}`}>
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
            <MessageSquareWarning size={35} />
          </span>
        </p>
        <h5 className="mb-2 font-semibold"> {title} </h5>
        <p>
          There was an error while fetching the data. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default Error;
