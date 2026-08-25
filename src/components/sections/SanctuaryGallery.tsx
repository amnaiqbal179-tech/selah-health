"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface GalleryItem {
  title: string;
  category: string;
  description: string;
  src: string;
  className: string;
  number: string;
}

const galleryItems: GalleryItem[] = [
  {
    number: "01",
    title: "Private Consultation Suites",
    category: "A Quiet Place",
    description:
      "Warm, private spaces designed to help you feel comfortable, present, and completely at ease.",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
    className:
      "md:col-span-2 md:row-span-2 min-h-[430px] md:min-h-[610px]",
  },
  {
    number: "02",
    title: "Moments of Stillness",
    category: "Mindful Space",
    description:
      "Soft surroundings that give your mind room to slow down between conversations.",
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop",
    className: "min-h-[280px] md:min-h-[290px]",
  },
  {
    number: "03",
    title: "A Space to Breathe",
    category: "Cognitive Rest",
    description:
      "Natural light, gentle textures, and thoughtful details created for moments of reflection.",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    className: "min-h-[280px] md:min-h-[290px]",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.96,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function MagneticArrow() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 15,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 15,
  });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;

    x.set(mouseX * 0.18);
    y.set(mouseY * 0.18);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xl"
    >
      <ArrowUpRight
        size={17}
        strokeWidth={1.5}
      />
    </motion.div>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: GalleryItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 100,
    damping: 25,
  });

  const springY = useSpring(mouseY, {
    stiffness: 100,
    damping: 25,
  });

  const rotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2.5, 2.5]);

  const spotlightX = useTransform(springX, [-0.5, 0.5], ["15%", "85%"]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], ["15%", "85%"]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      whileHover={{
        y: -8,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[30px] border border-white/60 bg-white/60 shadow-[0_25px_80px_rgba(50,40,70,0.10)] backdrop-blur-sm ${item.className}`}
    >
      {/* IMAGE */}
      <motion.div
        className="absolute inset-0"
        initial={{
          clipPath: "inset(12% 8% 12% 8% round 30px)",
          scale: 1.12,
        }}
        whileInView={{
          clipPath: "inset(0% 0% 0% 0% round 30px)",
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.35,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08,
        }}
      >
        <motion.div
          className="relative h-full w-full"
          whileHover={{
            scale: 1.075,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            priority={index === 0}
            sizes={
              index === 0
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover object-center brightness-[0.91] saturate-[0.88]"
          />
        </motion.div>
      </motion.div>

      {/* CINEMATIC COLOR GRADE */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.7, 0.78, 0.7],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(145deg, rgba(199,184,245,0.10), transparent 42%, rgba(242,217,223,0.18))",
        }}
      />

      {/* DARK LEGIBILITY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#17161b]/90 via-[#17161b]/15 to-transparent opacity-85 transition-opacity duration-700 group-hover:opacity-95" />

      {/* CURSOR SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          left: spotlightX,
          top: spotlightY,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.16), transparent 65%)",
        }}
      />

      {/* TOP CONTENT */}
      <div className="absolute left-5 right-5 top-5 z-20 flex items-start justify-between">
        <motion.span
          whileHover={{
            scale: 1.04,
          }}
          className="rounded-full border border-white/25 bg-black/10 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl"
        >
          {item.category}
        </motion.span>

        <div className="opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <MagneticArrow />
        </div>
      </div>

      {/* NUMBER */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.35 + index * 0.1,
          duration: 0.6,
        }}
        className="absolute right-6 top-20 z-10 hidden text-[10px] font-medium tracking-[0.25em] text-white/45 md:block"
      >
        {item.number}
      </motion.div>

      {/* BOTTOM CONTENT */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-7">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.h3
            className="max-w-[520px] font-serif text-2xl font-medium leading-[1.05] tracking-[-0.025em] text-white md:text-3xl"
            whileHover={{
              x: 3,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {item.title}
          </motion.h3>

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 42,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.5 + index * 0.1,
            }}
            className="my-3 h-px bg-white/40"
          />

          <p className="max-w-[520px] text-xs leading-6 text-white/75 md:text-sm">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* INNER BORDER */}
      <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/20" />

      {/* HOVER COLOR WASH */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(199,184,245,0.20), transparent 45%, rgba(185,216,239,0.15))",
        }}
      />
    </motion.div>
  );
}

export default function SanctuaryGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="sanctuary"
      className="relative overflow-hidden bg-[var(--background)] px-4 pb-28 pt-28 sm:px-6 sm:pb-32 lg:px-8 lg:pb-40 lg:pt-36"
    >
      {/* =================================================
          AMBIENT BACKGROUND
      ================================================= */}

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[25%] h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(199,184,245,0.20), rgba(185,216,239,0.10), transparent 70%)",
        }}
        animate={{
          scale: [0.95, 1.08, 0.95],
          x: ["-50%", "-47%", "-50%"],
          y: [0, -18, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.35,
        }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 mx-auto mb-14 max-w-3xl text-center md:mb-18"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C6BDDC]/50 bg-white/65 px-4 py-2 shadow-sm backdrop-blur-xl"
        >
          <Sparkles
            className="h-3.5 w-3.5 text-[#8C82B5]"
            strokeWidth={1.6}
          />

          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#5A5180] sm:text-[10px]">
            The Sanctuary
          </span>
        </motion.div>

        <h2 className="font-serif text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-[#1A1B1F] sm:text-5xl md:text-6xl lg:text-7xl">
          Spaces that let you
          <br />
          <motion.span
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="inline-block bg-gradient-to-r from-[#7669A3] via-[#9A87C9] to-[#739DB8] bg-clip-text italic text-transparent"
          >
            breathe again.
          </motion.span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#2B2D33]/65 sm:text-base">
          Every detail is designed to make the experience feel less clinical
          and more human — quiet spaces, natural light, and room to simply be.
        </p>
      </motion.div>

      {/* =================================================
          BENTO GALLERY
      ================================================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.12,
        }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
      >
        {galleryItems.map((item, index) => (
          <GalleryCard
            key={item.number}
            item={item}
            index={index}
          />
        ))}
      </motion.div>

      {/* =================================================
          BOTTOM MICRO STORY
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="relative z-10 mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-black/[0.08] pt-6"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/40">
          Designed around you
        </span>

        <motion.span
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[10px] font-medium text-black/40"
        >
          Explore the experience →
        </motion.span>
      </motion.div>
    </section>
  );
}