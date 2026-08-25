"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Send,
  ShieldCheck,
  Lock,
  Sparkles,
  MapPin,
  Clock,
  ArrowUp,
  CheckCircle2,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const LOCATIONS = [
  {
    city: "Boston",
    address: "100 Cambridge St, Suite 1400",
    zip: "Boston, MA 02114",
    phone: "+1 (617) 555-0192",
  },
  {
    city: "New York",
    address: "450 Lexington Ave, Fl 22",
    zip: "New York, NY 10017",
    phone: "+1 (212) 555-0148",
  },
];

const NAVIGATION = [
  { label: "Care Pathways", href: "#pathways" },
  { label: "Specialists", href: "#specialists" },
  { label: "Insights", href: "#resources" },
  { label: "FAQ", href: "#faq" },
];

const CARE_LINKS = [
  { label: "Executive Burnout", href: "#care" },
  { label: "Sleep & Recovery", href: "#care" },
  { label: "Mood & Anxiety", href: "#care" },
  { label: "Telehealth Visit", href: "#care" },
];

/* =========================================================
   ANIMATION
========================================================= */

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[#8F82B5]/25
        bg-[#6B608F]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main Lavender Glow */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["-50%", "-46%", "-50%"],
                  y: [0, -15, 0],
                  opacity: [0.2, 0.3, 0.2],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[-180px]
            h-[380px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-[#DCD4F2]/30
            blur-[110px]
          "
        />

        {/* Left Glow */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, 20, 0],
                  opacity: [0.1, 0.18, 0.1],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-32
            top-[35%]
            h-[240px]
            w-[240px]
            rounded-full
            bg-[#BDB1DD]/20
            blur-[100px]
          "
        />

        {/* Right Glow */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -25, 0],
                  opacity: [0.08, 0.16, 0.08],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-32
            bottom-[5%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-[#D9CBEF]/20
            blur-[110px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />
      </div>

      {/* =====================================================
          COMPACT MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          py-7
          sm:px-6
          sm:py-8
          lg:px-8
          lg:py-9
        "
      >
        {/* =================================================
            NEWSLETTER
        ================================================== */}

        <motion.section
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            relative
            mb-7
            overflow-hidden
            rounded-[20px]
            border
            border-white/15
            bg-white/[0.09]
            px-5
            py-4
            backdrop-blur-xl
            sm:px-6
            lg:px-7
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-80px]
              top-[-80px]
              h-[220px]
              w-[220px]
              rounded-full
              bg-[#D9D0EF]/15
              blur-[80px]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* Text */}

            <div className="max-w-xl">
              <div className="mb-1.5 flex items-center gap-2">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/15
                    bg-white/10
                    px-2.5
                    py-1
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#E5DDF3]
                  "
                >
                  <Sparkles className="h-3 w-3" />
                  Clinical Insights
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-emerald-200/20
                    bg-emerald-300/10
                    px-2.5
                    py-1
                    text-[8px]
                    font-semibold
                    text-emerald-100
                  "
                >
                  ● Intake Open
                </span>
              </div>

              <h2
                className="
                  font-serif
                  text-xl
                  font-medium
                  leading-tight
                  tracking-[-0.035em]
                  text-white
                  sm:text-2xl
                "
              >
                Thoughtful insights,{" "}
                <span className="italic text-[#D9CDED]">
                  when you&apos;re ready.
                </span>
              </h2>

              <p className="mt-1.5 text-[11px] leading-5 text-white/55">
                Evidence-informed resources for a healthier mind.
              </p>
            </div>

            {/* Form */}

            <div className="w-full lg:w-[370px]">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-emerald-200/20
                      bg-white/10
                      px-4
                      py-2.5
                    "
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-200" />

                    <div>
                      <p className="text-xs font-semibold text-white">
                        You&apos;re on the list.
                      </p>

                      <p className="mt-0.5 text-[9px] text-white/45">
                        Thoughtful updates are on their way.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubscribe}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-1.5"
                  >
                    <div
                      className="
                        flex
                        rounded-xl
                        border
                        border-white/15
                        bg-white/[0.08]
                        p-1
                      "
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        aria-label="Email address"
                        className="
                          min-w-0
                          flex-1
                          bg-transparent
                          px-3
                          py-2
                          text-xs
                          text-white
                          outline-none
                          placeholder:text-white/35
                        "
                      />

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-[#E1D8F0]
                          px-4
                          py-2
                          text-[10px]
                          font-bold
                          text-[#5A5180]
                          shadow-lg
                          transition-colors
                          hover:bg-white
                        "
                      >
                        Subscribe
                        <Send className="h-3 w-3" />
                      </motion.button>
                    </div>

                    <p className="px-1 text-[8px] text-white/35">
                      Occasional insights only · Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* =================================================
            MAIN FOOTER CONTENT
        ================================================== */}

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            grid
            grid-cols-1
            gap-6
            border-b
            border-white/10
            pb-6
            sm:grid-cols-2
            lg:grid-cols-12
            lg:gap-7
          "
        >
          {/* BRAND */}

          <motion.div
            variants={childVariants}
            className="lg:col-span-4"
          >
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-3"
            >
              <motion.span
                whileHover={{
                  rotate: -7,
                  scale: 1.06,
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  font-serif
                  text-sm
                  font-bold
                  text-[#655A89]
                  shadow-lg
                "
              >
                S
              </motion.span>

              <div>
                <span className="block font-serif text-base font-semibold tracking-tight text-white">
                  Selah Health
                </span>

                <span className="mt-0.5 block text-[7px] font-bold uppercase tracking-[0.2em] text-[#D5CBE8]/65">
                  Psychiatry & Care
                </span>
              </div>
            </motion.a>

            <p
              className="
                mt-3
                max-w-sm
                text-[11px]
                leading-5
                text-white/50
              "
            >
              A calmer approach to mental wellness — bringing thoughtful
              expertise, personalized care, and human connection together.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <motion.span
                whileHover={{ y: -2 }}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.07]
                  px-2.5
                  py-1.5
                  text-[8px]
                  font-semibold
                  text-white/65
                "
              >
                <ShieldCheck className="h-3 w-3 text-[#D6CCE9]" />
                HIPAA Compliant
              </motion.span>

              <motion.span
                whileHover={{ y: -2 }}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.07]
                  px-2.5
                  py-1.5
                  text-[8px]
                  font-semibold
                  text-white/65
                "
              >
                <Lock className="h-3 w-3 text-[#D6CCE9]" />
                Private & Secure
              </motion.span>
            </div>
          </motion.div>

          {/* EXPLORE */}

          <motion.div
            variants={childVariants}
            className="lg:col-span-2"
          >
            <FooterColumn title="Explore">
              {NAVIGATION.map((item) => (
                <FooterLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </FooterColumn>
          </motion.div>

          {/* CARE */}

          <motion.div
            variants={childVariants}
            className="lg:col-span-2"
          >
            <FooterColumn title="Care">
              {CARE_LINKS.map((item) => (
                <FooterLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </FooterColumn>
          </motion.div>

          {/* LOCATION */}

          <motion.div
            variants={childVariants}
            className="sm:col-span-2 lg:col-span-4"
          >
            <div className="space-y-3">
              <h3
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#D6CCE9]
                "
              >
                Practice Locations
              </h3>

              <div
                className="
                  flex
                  max-w-xs
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.06]
                  p-1
                "
              >
                {LOCATIONS.map((location, index) => {
                  const active = activeLocation === index;

                  return (
                    <button
                      key={location.city}
                      type="button"
                      onClick={() => setActiveLocation(index)}
                      className="
                        relative
                        flex-1
                        cursor-pointer
                        rounded-md
                        py-1.5
                        text-[9px]
                        font-semibold
                      "
                    >
                      {active && (
                        <motion.span
                          layoutId="footer-location"
                          className="
                            absolute
                            inset-0
                            rounded-md
                            bg-white
                            shadow-sm
                          "
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 ${
                          active
                            ? "text-[#655A89]"
                            : "text-white/40"
                        }`}
                      >
                        {location.city}
                      </span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation}
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-2.5"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                      "
                    >
                      <MapPin className="h-3 w-3 text-[#D6CCE9]" />
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold text-white/80">
                        {LOCATIONS[activeLocation].address}
                      </p>

                      <p className="mt-0.5 text-[9px] text-white/40">
                        {LOCATIONS[activeLocation].zip}
                      </p>

                      <p className="mt-1 text-[10px] font-medium text-[#D6CCE9]">
                        {LOCATIONS[activeLocation].phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                      "
                    >
                      <Clock className="h-3 w-3 text-[#D6CCE9]" />
                    </span>

                    <span className="text-[9px] text-white/40">
                      Mon – Fri · 8 AM – 7 PM EST
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================================
            CLOSING STATEMENT
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            border-b
            border-white/10
            py-5
            text-center
            sm:py-6
          "
        >
          <p
            className="
              font-serif
              text-lg
              italic
              tracking-[-0.025em]
              text-[#E0D7EF]/75
              sm:text-xl
            "
          >
            Space to breathe. Space to begin again.
          </p>

          <div
            className="
              mx-auto
              mt-3
              h-px
              w-10
              bg-gradient-to-r
              from-transparent
              via-[#D3C7E8]/60
              to-transparent
            "
          />
        </motion.div>

        {/* =================================================
            BOTTOM BAR
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            flex
            flex-col
            gap-3
            pt-4
            text-[9px]
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Selah Health. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="transition-colors hover:text-white/75"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white/75"
            >
              Terms
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white/75"
            >
              Accessibility
            </a>

            <div className="flex items-center gap-1.5">
              <motion.a
                href="#"
                aria-label="Instagram"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  text-[8px]
                  font-bold
                  text-white/65
                  transition-colors
                  hover:bg-white
                  hover:text-[#655A89]
                "
              >
                IG
              </motion.a>

              <motion.a
                href="#"
                aria-label="LinkedIn"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  text-[8px]
                  font-bold
                  text-white/65
                  transition-colors
                  hover:bg-white
                  hover:text-[#655A89]
                "
              >
                IN
              </motion.a>
            </div>

            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              whileHover={{
                y: -3,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className="
                flex
                h-8
                w-8
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#655A89]
                shadow-lg
              "
            >
              <ArrowUp className="h-3 w-3" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3
        className="
          text-[8px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-[#D6CCE9]
        "
      >
        {title}
      </h3>

      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
}

/* =========================================================
   FOOTER LINK
========================================================= */

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <li>
      <motion.a
        href={href}
        whileHover={{
          x: 4,
        }}
        className="
          group
          inline-flex
          items-center
          gap-1.5
          text-[10px]
          font-medium
          text-white/50
          transition-colors
          duration-300
          hover:text-white
        "
      >
        <span className="relative">
          {label}

          <span
            className="
              absolute
              -bottom-1
              left-0
              h-px
              w-0
              bg-[#D8CDEC]
              transition-all
              duration-300
              group-hover:w-full
            "
          />
        </span>

        <ArrowUpRight
          className="
            h-2.5
            w-2.5
            -translate-x-1
            translate-y-1
            opacity-0
            transition-all
            duration-300
            group-hover:translate-x-0
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        />
      </motion.a>
    </li>
  );
}