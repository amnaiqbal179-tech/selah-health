"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const NAV_LINKS = [
  { name: "Care Pathways", href: "#pathways" },
  { name: "Specialists", href: "#specialists" },
  { name: "Insights", href: "#resources" },
  { name: "Insurance", href: "#trust" },
];

interface NavbarProps {
  onOpenAssessment?: () => void;
}

export default function Navbar({ onOpenAssessment }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();

  /*
   * Scroll-aware navbar state trigger
   */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  /*
   * Detect active section
   */
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((link) =>
        document.querySelector(link.href)
      );

      let currentIndex: number | null = null;

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 180 && rect.bottom >= 180) {
          currentIndex = index;
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*
   * Close mobile menu when resizing to desktop
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*
   * Prevent background scroll while mobile menu is open
   */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleActionClick = () => {
    if (onOpenAssessment) {
      onOpenAssessment();
    }

    setMobileMenuOpen(false);
  };

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          FIXED NAVBAR HEADER
      ====================================================== */}
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-[100]
          px-3
          pt-3
          sm:px-5
          sm:pt-4
          lg:px-8
          pointer-events-none
        "
      >
        <nav
          className={`
            relative
            mx-auto
            flex
            w-full
            max-w-7xl
            items-center
            justify-between
            rounded-full
            px-4
            py-3
            sm:px-5
            lg:px-6
            pointer-events-auto
            overflow-hidden
            transition-all
            duration-300
            ${
              isScrolled
                ? `
                  border
                  border-[#C9BEDD]/60
                  bg-white/85
                  shadow-[0_18px_60px_rgba(70,55,95,0.12)]
                  backdrop-blur-2xl
                `
                : `
                  border
                  border-[#DDD6E5]/70
                  bg-[#FAF8FC]/80
                  shadow-[0_10px_40px_rgba(70,55,95,0.05)]
                  backdrop-blur-xl
                `
            }
          `}
        >
          {/* Animated Background Light */}
          <motion.div
            aria-hidden="true"
            animate={{
              x: ["-20%", "20%", "-20%"],
              opacity: isScrolled ? [0.35, 0.55, 0.35] : [0.18, 0.3, 0.18],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-1/4
              w-1/2
              bg-gradient-to-r
              from-transparent
              via-[#C8BCE4]/25
              to-transparent
              blur-2xl
            "
          />

          {/* Top Light Reflection Line */}
          <motion.div
            animate={{
              x: ["-120%", "220%"],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-px
              w-1/3
              bg-gradient-to-r
              from-transparent
              via-white
              to-transparent
              opacity-70
            "
          />

          {/* Brand Logo */}
          <a
            href="#"
            className="
              relative
              z-20
              flex
              shrink-0
              items-center
              gap-2.5
              sm:gap-3
            "
          >
            <div className="relative">
              <motion.div
                whileHover={{
                  rotate: -8,
                  scale: 1.08,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                }}
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-gradient-to-br
                  from-[#6D6295]
                  via-[#5A5180]
                  to-[#464064]
                  font-serif
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_24px_rgba(90,81,128,0.28)]
                  sm:h-10
                  sm:w-10
                "
              >
                <span className="relative z-10">S</span>

                <motion.span
                  animate={{
                    x: ["-100%", "150%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    inset-y-0
                    w-1/2
                    rotate-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                  "
                />
              </motion.div>

              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  h-2.5
                  w-2.5
                  rounded-full
                  border-2
                  border-[#FAF8FC]
                  bg-gradient-to-br
                  from-[#B7A8D8]
                  to-[#7E719F]
                "
              />
            </div>

            <div className="hidden xs:block">
              <span
                className="
                  block
                  font-serif
                  text-[15px]
                  font-bold
                  leading-none
                  tracking-tight
                  text-[#1A1B1F]
                  transition-colors
                  duration-300
                  group-hover:text-[#5A5180]
                  sm:text-base
                "
              >
                Selah Health
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#8D7CB6]
                  sm:text-[8px]
                "
              >
                Psychiatry & Care
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div
            onMouseLeave={() => setHoveredIndex(null)}
            className="
              relative
              z-20
              hidden
              items-center
              gap-0.5
              rounded-full
              border
              border-[#D9D1E4]/70
              bg-[#F4F0F8]/55
              p-1
              backdrop-blur-md
              md:flex
            "
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = activeIndex === index;
              const isHovered = hoveredIndex === index;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => handleNavClick(index)}
                  className="
                    relative
                    rounded-full
                    px-4
                    py-2
                    text-[11px]
                    font-semibold
                    text-[#34313B]
                    transition-colors
                    duration-300
                    hover:text-[#5A5180]
                    lg:px-5
                  "
                >
                  {isHovered && (
                    <motion.span
                      layoutId="navbar-hover"
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-white
                        shadow-[0_4px_18px_rgba(70,55,95,0.08)]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  {isActive && !isHovered && (
                    <motion.span
                      layoutId="navbar-active"
                      className="
                        absolute
                        bottom-1
                        left-1/2
                        h-1
                        w-1
                        -translate-x-1/2
                        rounded-full
                        bg-[#8D7CB6]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="relative z-20 hidden items-center gap-2 md:flex">
            <motion.button
              type="button"
              onClick={handleActionClick}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="
                group
                flex
                cursor-pointer
                items-center
                gap-1.5
                rounded-full
                border
                border-[#C9BEDD]/60
                bg-white/70
                px-3
                py-2
                text-[10px]
                font-bold
                text-[#5A5180]
                shadow-sm
                backdrop-blur-md
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Intake Open</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={handleActionClick}
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.96 }}
              className="
                group
                relative
                flex
                cursor-pointer
                items-center
                gap-2
                overflow-hidden
                rounded-full
                bg-gradient-to-r
                from-[#665B8C]
                via-[#5A5180]
                to-[#4D456D]
                px-5
                py-2.5
                text-[11px]
                font-semibold
                text-white
                shadow-[0_10px_28px_rgba(90,81,128,0.25)]
              "
            >
              <motion.span
                animate={{ x: ["-120%", "180%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  inset-y-0
                  w-1/3
                  rotate-[15deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                "
              />

              <span className="relative z-10">Begin Journey</span>
              <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="
              relative
              z-30
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-[#C9BEDD]/60
              bg-[#F2EFF8]/80
              text-[#5A5180]
              backdrop-blur-md
              md:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="
                  fixed
                  inset-0
                  -z-10
                  bg-[#292332]/10
                  backdrop-blur-sm
                  md:hidden
                "
              />

              <motion.div
                initial={{
                  opacity: 0,
                  y: -18,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  scale: 0.97,
                  filter: "blur(6px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  pointer-events-auto
                  relative
                  mx-auto
                  mt-3
                  max-w-7xl
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#C9BEDD]/60
                  bg-[#FAF8FC]/95
                  p-4
                  shadow-[0_30px_100px_rgba(50,40,70,0.18)]
                  backdrop-blur-2xl
                  md:hidden
                "
              >
                <div className="relative z-10 space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => handleNavClick(index)}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05 }}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3.5
                        text-sm
                        font-semibold
                        text-[#2B2D33]
                        transition-colors
                        hover:bg-white
                        hover:text-[#5A5180]
                      "
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#8D7CB6]" />
                    </motion.a>
                  ))}
                </div>

                <div className="relative z-10 mt-3 border-t border-[#D9D1E4]/70 pt-4">
                  <button
                    type="button"
                    onClick={handleActionClick}
                    className="
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-gradient-to-r
                      from-[#665B8C]
                      to-[#4D456D]
                      py-3.5
                      text-xs
                      font-semibold
                      text-white
                      shadow-[0_10px_30px_rgba(90,81,128,0.22)]
                    "
                  >
                    <Sparkles className="h-4 w-4 text-[#D9D0EE]" />
                    <span>Begin Assessment Journey</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[9px] font-medium text-[#6E638A]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#8D7CB6]" />
                    Private & secure care
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}