import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export const NotificationBadge = ({
  label,
  className,
  show,
  children,
  ...props
}) => {
  const showBadge =
    typeof label !== "undefined" && (typeof show === "undefined" || show);
  return (
    <div className="inline-flex relative">
      {children}
      {showBadge && (
        <Badge
          className={cn(
            "absolute top-0 right-0 rounded-full",
            typeof label !== "undefined" && ("" + label).length === 0
              ? "translate-x-1 -translate-y-1 px-1 py-1.5"
              : "translate-x-1.5 -translate-y-1.5 py-0 px-1.5",
            className
          )}
          {...props}
        >
          {"" + label}
        </Badge>
      )}
    </div>
  );
};
