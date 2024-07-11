"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { createUserSchema } from "@/entities/user";
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
import { saveTokenStorage } from "@/shared/lib/auth-tokens";
import { useRouter } from "next/navigation";
import { register } from "../api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import {
  getCountryCodeByName,
  getStateCodeByName,
} from "@/features/register/lib/helpers";

export function RegisterForm() {
  const router = useRouter();
  const [countries, setCountries] = React.useState<ICountry[]>([]);
  const [cities, setCities] = React.useState<ICity[]>([]);
  const [states, setStates] = React.useState<IState[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = React.useState(true);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      profile: {
        firstName: "",
        lastName: "",
        country: "",
        state: "",
        city: "",
      },
    },
  });

  const { watch } = form;
  const watchCountry = watch("profile.country");
  const watchState = watch("profile.state");

  useEffect(() => {
    if (isFirstLoaded) {
      setCountries(Country.getAllCountries());
      setIsFirstLoaded(false);
    }
  }, [isFirstLoaded]);

  useEffect(() => {
    if (watchCountry) {
      form.resetField("profile.state");
      const code = getCountryCodeByName(countries, watchCountry);
      setStates(State.getStatesOfCountry(code) || []);
    } else {
      setStates([]);
    }
  }, [watchCountry, countries, getCountryCodeByName]);

  useEffect(() => {
    if (watchCountry && watchState) {
      form.resetField("profile.city");
      const countryCode = getCountryCodeByName(countries, watchCountry);
      const stateCode = getStateCodeByName(states, watchState);
      setCities(City.getCitiesOfState(countryCode, stateCode) || []);
    } else if (watchCountry && states.length === 0) {
      form.resetField("profile.city");
      const countryCode = getCountryCodeByName(countries, watchCountry);
      setCities(City.getCitiesOfCountry(countryCode) || []);
    } else {
      setCities([]);
    }
  }, [watchCountry, watchState, countries, states]);

  const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
    await register(data).then(({ access_token }) => {
      saveTokenStorage(access_token);
      router.push("/books");
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[500px] max-w-[500px]"
      >
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

        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="profile.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your country</FormLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((country) => (
                        <SelectItem key={country.isoCode} value={country.name}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your state</FormLabel>

                <Select
                  disabled={states.length === 0}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((state) => (
                        <SelectItem key={state.isoCode} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your city</FormLabel>
                <Select
                  disabled={
                    !watchState ||
                    (!watchCountry && states.length === 0) ||
                    cities.length === 0
                  }
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.sort().map((city, index) => (
                      <SelectItem
                        key={`${city.countryCode}${city.stateCode}${index}`}
                        value={city.name}
                      >
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create account</Button>
      </form>
    </Form>
  );
}
