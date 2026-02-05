import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string | null; initials?: string; size?: string }
>(({ className, src, initials, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center",
      className
    )}
    {...props}
  >
    {src ? (
      <img src={src} alt={initials || "Avatar"} className="aspect-square h-full w-full object-cover" />
    ) : (
      <span className="font-medium uppercase">{initials}</span>
    )}
  </div>
))
Avatar.displayName = "Avatar"

export { Avatar }
