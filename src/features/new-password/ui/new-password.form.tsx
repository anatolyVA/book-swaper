"use client";
import React from "react";
import { z } from "zod";
import { newPasswordSchema } from "@/entities/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { login } from "@/features/login/api";
import { saveTokenStorage } from "@/shared/lib/auth-tokens";
import { useRouter } from "next/navigation";
import { confirmEmail } from "../api";

export function NewPassword() {
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof newPasswordSchema>) => {
    const { email } = data;
    await confirmEmail(email)
      .catch(() => console.log("GOVORILI NE SHAMKAT!"))
      .then(() => console.log("on otpravilsia)"));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[400px] max-w-[400px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
