"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "motion/react";
import React from "react";

export const ScrollProgress = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
      stiffness: 200,
      damping: 50,
      restDelta: 0.001,
    });

    return (
      <motion.div
        ref={ref}
        className={cn(
          "h-1 origin-left bg-gradient-to-r from-[color:--main-mmz-blue]  to-[color:--main-mmz-yellow]",
          className
        )}
        style={{
          scaleX,
        }}
        {...props}
      />
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";
