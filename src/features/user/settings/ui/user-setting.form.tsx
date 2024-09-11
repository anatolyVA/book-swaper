"use client";

import React, { useEffect, useState } from "react";
import { updateUserSchema, useProfile, User, userApi } from "@/entities/user";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import useStore from "@/shared/lib/use-store";
import { toast } from "sonner";

export function UserSettingForm() {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    defaultValues: {
      email: "",
      oldPassword: "",
      profile: {
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        state: "",
      },
    },
    resolver: zodResolver(updateUserSchema),
  });

  const profile = useStore(useProfile, (state) => state.profile);

  // TODO fix
  const isChanged =
    JSON.stringify(profile) !== JSON.stringify(form.getValues());

  useEffect(() => {
    form.reset(profile);
  }, [profile]);

  if (!profile) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
    userApi
      .updateUser(profile.id, values)
      .then((data) => {
        form.reset(data);
        form.clearErrors();
        toast.success("Profile updated");
      })
      .catch((err) => {
        const data = err?.response?.data;
        const message = data?.message || "Something went wrong";
        toast.error(message);
      });
  };
  const handleFormReset = () => {
    form.reset(profile);
    form.clearErrors();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profile.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 mt-2">
          <Button type="submit" className="w-32" disabled={!isChanged}>
            Save changes
          </Button>
          <Button
            variant="secondary"
            onClick={handleFormReset}
            type="button"
            className="w-32"
            disabled={!isChanged}
          >
            Reset changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
