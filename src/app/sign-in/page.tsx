import { LoginForm } from "@/features/login";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ROUTES } from "@/shared/config/routes";

export default function SignInPage() {
  return (
    <main className="grid xl:grid-cols-2 min-h-screen">
      <section
        className={`relative flex flex-col gap-4 p-12 justify-center items-center`}
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
        <h2 className="text-center text-3xl font-bold text-primary">Sign In</h2>
        <LoginForm />
        <div className="flex gap-4">
          <Button asChild variant="link">
            <Link href={ROUTES.SIGN_UP}>I don`t have an account yet</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="#">I forgot my password</Link>
          </Button>
        </div>
      </section>
      <section className="bg-primary hidden xl:block"></section>
    </main>
  );
}
