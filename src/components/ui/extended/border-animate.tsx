import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const BorderAnimate: React.FC<{
  full?: boolean;
  className?: string;
  childContainerClassName?: string;
  as?: "div" | "motion.div";
  children: React.ReactNode;
}> = ({
  full = false,
  className,
  childContainerClassName,
  as = "div",
  children,
  ...props
}) => {
  const Component = as === "motion.div" ? motion.div : "div";
  return (
    <Component
      className={cn(
        "filter-blur relative overflow-hidden rounded-md bg-transparent p-[1.5px] shadow-sm",
        full ? "border-animate-full" : "border-animate",
        className,
      )}
      {...props}
    >
      <Component
        className={cn(
          "group relative z-10 h-full w-full rounded-sm bg-background p-2",
          childContainerClassName,
        )}
      >
        {children}
      </Component>
    </Component>
  );
};

export default BorderAnimate;
