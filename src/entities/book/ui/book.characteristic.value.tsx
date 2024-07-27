import React from "react";
import { beautifyValue, cn } from "@/shared/lib/utils";

interface CharacteristicValueProps {
  name: string;
  value: string;
  className?: string;
  disableBeautify?: boolean;
}
export function BookCharacteristicValue({
  name,
  value,
  disableBeautify = false,
  className,
}: CharacteristicValueProps) {
  return (
    <div className={cn(`flex flex-col`, className)}>
      <span className="mr-1 text-xs uppercase font-bold text-gray-400">
        {name}:
      </span>
      <p>{disableBeautify ? value : beautifyValue(value.toString())}</p>
    </div>
  );
}
