import { LoginForm } from "@/features/login";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import Image from "next/image";
import { RegisterForm } from "@/features/register";
import React from "react";
import { ROUTES } from "@/shared/config/routes";
import { Logo } from "@/entities/logo";

export default function SignUpPage() {
  return (
    <main className="grid xl:grid-cols-2 min-h-screen">
      <section className="bg-secondary hidden xl:block"></section>
      <section
        className={`relative flex flex-col gap-4 p-12 justify-center items-center`}
      >
        <Link href="/" className="absolute top-4 right-8">
          <Logo />
        </Link>
        <h2 className="text-center text-3xl font-bold text-primary">Sign Up</h2>
        <RegisterForm />
        <div className="flex gap-4">
          <Button asChild variant="link">
            <Link href={ROUTES.SIGN_IN}>I already have an account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
