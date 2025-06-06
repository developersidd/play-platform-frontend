import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center gap-5 md:gap-7 xl:gap-10">
      <div className="flex items-center gap-1 ">
        <Link href="/" className="">
          <Image
            alt="youtube-clone"
            className="size-12 md:size-14"
            src="/assets/images/logo.svg"
            width={100}
            height={100}
          />
        </Link>

        <div className="-mt-1">
          <h1 className="text-lg font-semibold uppercase">Play</h1>
          <p className="text-xs text-muted-foreground">
            Personalized video platform
          </p>
        </div>
      </div>
      <div className="container">
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;
