import { Pin } from "./user-pin-dialogue";
import BorderAnimate from "@/components/ui/extended/border-animate";
import { cn } from "@/lib/utils";
import { auth } from "@/server/auth";
import { motion } from "framer-motion";

const ClosedNode: React.FC<{ pin: Pin; id: string }> = async ({ pin, id }) => {
  const session = await auth();

  const Component =
    session?.user.id === pin.createdBy.id ? BorderAnimate : "div";

  return (
    <Component
      aria-description="closed-container"
      className={cn(
        "flex h-16 w-16 items-center justify-center overflow-hidden rounded-md",
        "transition-shadow",
        "_cursor-none hover:shadow-lg hover:shadow-border",
        "active:translate-y-[1px] active:shadow-inner",
        { "border border-border": pin.index !== 1 },
      )}
      //   layoutId={`dialog-${id}`}
    >
      <motion.div
        aria-description="closed-img"
        layoutId={`dialog-img-${id}`}
        className="h-16 w-16"
      >
        <motion.img src={pin.createdBy.image!} className="h-16 w-16 max-w-16" />
      </motion.div>
      <div
        aria-description="closed-content"
        className="hidden flex-grow flex-row items-end justify-between p-2"
      >
        <div>
          <motion.div
            aria-description="closed-title"
            layoutId={`dialog-title-${id}`}
          ></motion.div>
          <motion.div
            aria-description="closed-subtitle"
            layoutId={`dialog-subtitle-${id}`}
            layout="position"
            className="text-muted-foreground"
          >
            {pin.createdBy.name}
          </motion.div>
        </div>
      </div>
    </Component>
  );
};

export default ClosedNode;
