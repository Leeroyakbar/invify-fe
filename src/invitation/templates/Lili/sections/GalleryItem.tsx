import { motion } from "framer-motion";
import {useState} from "react";

export function GalleryItem({ src, className, index, onClick }: { src: string; className: string; index: number; onClick: () => void }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -50px 0px" }} // Triggers sedikit lebih awal agar mulus
            transition={{ duration: 0.4, ease: "easeOut", delay: (index % 2) * 0.05 }} // Staggered delay ringan tanpa membebani thread
            onClick={onClick}
            className={`${className} relative overflow-hidden rounded-2xl border border-white/10 active:scale-98 transition-transform shadow-2xl bg-white/2 cursor-pointer will-change-transform contain-intrinsic-size`}
        >
            {/* SKELETON LOADER: Mencegah layout-shift saat image dimuat */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-white/3 animate-pulse" />
            )}

            <img
                src={src}
                alt={`Gallery Moment ${index + 1}`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transform hover:scale-105 transition-all duration-500 will-change-transform ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </motion.div>
    )
}