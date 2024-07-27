"use client";

import React, { useCallback, useEffect, useId } from "react";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Country } from "country-state-city";
import { api } from "@/shared/api/axios";
import {
  Author,
  Book,
  bookApi,
  BookCondition,
  BookCoverType,
  BookGenre,
  Language,
} from "@/entities/book";
import { beautifyValue, getInitials } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import debounce from "lodash/debounce";

interface BookListFiltersProps {
  authors: Author[];
  languages: Language[];
  onChange?: (data: { books: Book[]; total: number }) => void;
}
type GlobalSelected = {
  name: string;
  selected: string[];
};

export function BookListFilters({
  authors,
  languages,
  onChange,
}: BookListFiltersProps) {
  const [globalSelected, setGlobalSelected] = React.useState<GlobalSelected[]>(
    [],
  );
  const [searchValue, setSearchValue] = React.useState("");

  const handleDebounceFn = (value: string, filters: GlobalSelected[]) => {
    fetchBooks(value, filters);
  };

  const debounceFn = useCallback(
    debounce((value, filters) => handleDebounceFn(value, filters), 300),
    [],
  );

  const countryVariants: OptionVariant[] = Country.getAllCountries().map(
    (country) => ({
      label: country.name,
      value: country.isoCode,
    }),
  );
  const coverTypeVariants: OptionVariant[] = Object.values(BookCoverType).map(
    (type) => ({ id: type, label: beautifyValue(type), value: type }),
  );
  const conditionVariants: OptionVariant[] = Object.values(BookCondition).map(
    (condition) => ({
      label: beautifyValue(condition),
      value: condition,
    }),
  );
  const genreVariants: OptionVariant[] = Object.values(BookGenre).map(
    (genre) => ({ id: genre, label: beautifyValue(genre), value: genre }),
  );
  const [authorVariants, setAuthorVariants] = React.useState<OptionVariant[]>(
    authors.map((author) => ({
      label: getInitials(author.firstName, author.lastName, author.patronym),
      value: author.id,
    })),
  );
  const [languageVariants, setLanguageVariants] = React.useState<
    OptionVariant[]
  >(
    languages.map((language) => ({
      label: language.name,
      value: language.code,
    })),
  );

  const fetchBooks = (
    searchValue: string,
    selectedFilters: GlobalSelected[],
  ) => {
    const query = new URLSearchParams();
    selectedFilters.forEach(({ name, selected }) => {
      if (selected.length > 0) {
        query.append(name, selected.join(","));
      }
    });

    if (searchValue) {
      query.append("search", searchValue);
      console.log(query.toString());
    }

    bookApi
      .filterBooks(query.toString())
      .then((data) => {
        console.log(data);
        onChange?.(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChanges = (name: string, selected: string[]) => {
    const index = globalSelected.findIndex((item) => item.name === name);
    const newArray =
      index > -1
        ? [
            ...globalSelected.slice(0, index),
            { name, selected },
            ...globalSelected.slice(index + 1),
          ]
        : [...globalSelected, { name, selected }];

    setGlobalSelected(newArray);
    debounceFn(searchValue, newArray);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    debounceFn(searchTerm, globalSelected);
  };
  const handleClearBtnClick = () => {
    setSearchValue("");
    setGlobalSelected([]);
    fetchBooks("", []);
  };
  return (
    <>
      <aside className="hidden xl:block px-8 pb-4 h-fit">
        <header className="xl:mb-4">
          <h2 className="text-2xl">Filters</h2>
        </header>
        <main className="flex flex-col gap-4">
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          <FilterOption
            variants={genreVariants}
            selectedValues={
              globalSelected.find((item) => item.name === "genre")?.selected ||
              []
            }
            onCheckedChange={handleChanges}
            label="Genre"
            name="genre"
          />
          <FilterOption
            variants={conditionVariants}
            selectedValues={
              globalSelected.find((item) => item.name === "condition")
                ?.selected || []
            }
            onCheckedChange={handleChanges}
            label="Condition"
            name="condition"
          />
          <FilterOption
            variants={coverTypeVariants}
            onCheckedChange={handleChanges}
            selectedValues={
              globalSelected.find((item) => item.name === "coverType")
                ?.selected || []
            }
            label="Cover type"
            name="coverType"
          />
          <FilterOption
            variants={authorVariants}
            onCheckedChange={handleChanges}
            selectedValues={
              globalSelected.find((item) => item.name === "authorId")
                ?.selected || []
            }
            label="Author"
            name="authorId"
          />
          <FilterOption
            variants={languageVariants}
            onCheckedChange={handleChanges}
            selectedValues={
              globalSelected.find((item) => item.name === "languageCode")
                ?.selected || []
            }
            label="Language"
            name="languageCode"
          />
          <FilterOption
            variants={countryVariants}
            onCheckedChange={handleChanges}
            label="Owner country"
            selectedValues={
              globalSelected.find((item) => item.name === "ownerCountry")
                ?.selected || []
            }
            name="ownerCountry"
          />
          <Button
            disabled={
              globalSelected.flatMap((item) => item.selected).length === 0 &&
              !searchValue
            }
            onClick={handleClearBtnClick}
          >
            Clear filters
          </Button>
        </main>
      </aside>
      <div className="block xl:hidden border-b px-8 pb-4 h-fit">filters</div>
    </>
  );
}

type OptionVariant = {
  label: string;
  value: string;
};

type Option = {
  name: string;
  label: string;
  variants: OptionVariant[];
};

interface FilterOptionProps extends Option {
  selectedValues: string[];
  onCheckedChange: (name: string, selected: string[]) => void;
}

function FilterOption({
  label,
  name,
  selectedValues,
  variants,
  onCheckedChange,
}: FilterOptionProps) {
  const [isMoreHidden, setIsMoreHidden] = React.useState(true);
  const [selected, setSelected] = React.useState<string[]>(selectedValues);

  useEffect(() => {
    onCheckedChange(name, selected);
  }, [selected]);

  useEffect(() => {
    setSelected(selectedValues);
  }, [selectedValues]);

  const handleCheckedChange = (checked: boolean, value: string) => {
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  const variantsRender = () => {
    return (isMoreHidden ? variants.slice(0, 5) : variants).map((variant) => (
      <CheckboxWithText
        key={variant.value}
        label={variant.label}
        checked={selected.includes(variant.value)}
        onCheckedChange={(checked) =>
          handleCheckedChange(checked, variant.value)
        }
        value={variant.value}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold">{label}</span>
      <div className="flex flex-col gap-1 max-h-[400px] overflow-y-scroll">
        {variants.length > 0 ? (
          variantsRender()
        ) : (
          <span className="text-muted-foreground text-sm">No variants</span>
        )}
      </div>
      {variants.length > 5 && (
        <Button
          onClick={() => setIsMoreHidden(!isMoreHidden)}
          variant="text"
          size="sm"
          className="pl-1.5 items-center"
        >
          {isMoreHidden ? "Show more" : "Show less"}
          {isMoreHidden ? (
            <ChevronDown className="w-4 h-4 ml-1" />
          ) : (
            <ChevronUp className="w-4 h-4 ml-1" />
          )}
        </Button>
      )}
    </div>
  );
}

interface CheckboxWithTextProps extends OptionVariant {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}
function CheckboxWithText({
  label,
  value,
  checked,
  onCheckedChange,
}: CheckboxWithTextProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex space-x-2 group hover:bg-muted/40 rounded-md cursor-pointer p-2 items-center"
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        value={value}
        id={id}
      />
      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </span>
    </label>
  );
}
