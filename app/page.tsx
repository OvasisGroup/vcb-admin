"use client";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
// Update the import path according to your setup
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/use-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePermissions } from "@/context/PermissionsContext";
import { FaRegUserCircle } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();

  const { updatePermissions } = usePermissions();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    sessionStorage.clear();

    if (!password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please input password",
      });
      return;
    }
    setIsLoggingIn(true);

    const result = await signIn("credentials", {
      redirect: false,
      userId,
      password,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Incorrect Username/Password.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      try {
        // Fetch the session after successful login
        const session = await getSession();
        console.log("Login Page Session:", session);

        const accessToken = session?.user?.access_token;
        const userId = session?.user?.userId;     

        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem("userId", JSON.stringify(userId));
        console.log("userId", session?.user?.userId);
        // Check if it's the first login
        if (session?.user?.firstLogin) {
          // Navigate to the reset password page if it's the first login
          router.push("/change-password");
        } else {
          // Navigate to the verification page if it's not the first login
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-col w-1/2 bg-vcblue flex items-center justify-center bg-[url(/assets/images/background-login-min.jpg)] bg-no-repeat bg-center bg-cover">
        <h2 className="text-white font-extrabold text-4xl">
          Welcome to Victoria Bank
          <br />
          <span className="text-vcbgold">Administration Portal</span>
        </h2>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center p-10">
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col justify-center items-center pb-4">
            <Image
              width={180}
              height={75}
              className="p-4 mt-4"
              src="/assets/images/vcblogo.svg"
              alt="logo"
            />
            <p>Please sign in to continue</p>
          </div>
          <div className="relative flex items-center">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border p-2 rounded-md mb-2 font-light border-vcblue"
          />
          <FaRegUserCircle className="absolute right-3 top-1/2 transform -translate-y-1/2"/>
          </div>

          <div className="flex items-center relative">
            <input
              type={showPassword ? " text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md mb-2 font-light border-vcblue"
            />
            {showPassword ? (
              <AiOutlineEyeInvisible
                onClick={() => setShowPassword(false)}
                style={{ cursor: "pointer" }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            ) : (
              <AiOutlineEye
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-vcblue text-white hover:bg-vcbgold"
          >
            {isLoggingIn ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
