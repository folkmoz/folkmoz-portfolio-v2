import { motion } from "framer-motion";
import BlurFade from "./magicui/blur-fade";

export default function ScrollDownUI() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.25 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="h-[70px] w-[30px] rounded-full border-2 border-primary-foreground flex items-end justify-center py-1 mt-20">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            type: "tween",
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="size-[17px] rounded-full bg-muted-foreground"
        ></motion.div>
      </div>

      <div>
        <motion.p
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            type: "tween",
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-center text-primary-foreground font-bold mt-4"
        >
          Scroll Down
        </motion.p>
      </div>
    </motion.div>
  );
}
