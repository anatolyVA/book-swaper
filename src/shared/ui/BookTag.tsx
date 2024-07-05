import * as React from "react"

import { cn } from "@/shared/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const BookTag = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, value,...props }) => {
        return (
            <div
                  className={cn(
                      "inline-block bg-black text-white uppercase px-4 rounded-md text-[12px]",
                      className
                  )}
                  {...props}>
                {value}
            </div>

        )
    }
)
BookTag.displayName = "BookTag"

export { BookTag }