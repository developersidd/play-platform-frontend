import Image from "next/image";
import Link from "next/link";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center gap-4 md:gap-6 xl:gap-7">
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
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
