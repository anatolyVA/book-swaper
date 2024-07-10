"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/features/login";
import { Button } from "@/shared/ui/button";
import { RegisterForm } from "@/features/register";

export function UserLogin() {
  return <ForgotPassword />;
}
/* <section
      className={`relative flex flex-col gap-4 p-12 justify-center items-center ${true ? "xl:registerKeyframe" : ""} bg-black`}
    >
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="black-logo"
          width={180}
          height={24}
          className="absolute top-8 left-8"
        />
      </Link>
      <h2 className="text-center text-3xl font-bold text-primary">
        {true ? "Register" : "Sign In"}
      </h2>

      {true ? <RegisterForm /> : <LoginForm />}

      <div className="flex gap-4">
        <Button asChild variant="link">
          <Link href="/auth#sign-up">I don`t have an account yet</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="#">I forgot my password</Link>
        </Button>
      </div>
    </section>*/
