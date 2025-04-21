import { motion } from "framer-motion";

export default function MarqueeText() {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-white py-2 border-t border-b">
      <motion.div
        className="inline-block text-lg font-medium text-gray-700"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {Array(10).fill("• Grow Your Green Dream • ").map((text, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </motion.div>
    </div>
  );
}
