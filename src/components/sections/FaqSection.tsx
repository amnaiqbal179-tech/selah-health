"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  useReducedMotion,
} from "framer-motion";
import {
  Plus,
  HelpCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Care & Therapy" | "Insurance";
}

const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "How quickly can I schedule an initial consultation?",
    answer:
      "Most new patients are matched with a specialist within 48 hours. Once you complete our short digital assessment, our intake team coordinates your first appointment.",
  },
  {
    category: "Care & Therapy",
    question: "Are virtual appointments available?",
    answer:
      "Yes. Virtual therapy and psychiatric appointments can make it easier to receive support from a familiar and comfortable environment.",
  },
  {
    category: "Insurance",
    question: "Do you accept insurance or provide superbills?",
    answer:
      "We work with a range of insurance providers. If your plan is not directly supported, we can provide the documentation you need to explore out-of-network reimbursement.",
  },
  {
    category: "Care & Therapy",
    question:
      "What is the difference between psychiatry and psychotherapy?",
    answer:
      "Psychiatrists are medical doctors who can evaluate mental health conditions and prescribe medication when appropriate. Psychotherapists focus primarily on talk therapy, emotional processing, and behavioral strategies.",
  },
  {
    category: "General",
    question: "What if I am not sure what kind of support I need?",
    answer:
      "You do not need to have everything figured out before you begin. We can help you understand the available pathways and find an approach that feels appropriate for where you are right now.",
  },
  {
    category: "Care & Therapy",
    question: "Can I change my specialist later?",
    answer:
      "Absolutely. Finding the right person matters. If your first match does not feel like the right fit, you can explore another specialist without feeling locked into your first choice.",
  },
];

const CATEGORIES = [
  "All",
  "General",
  "Care & Therapy",
  "Insurance",
] as const;

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    FAQS[0].question
  );

  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const shouldReduceMotion = useReducedMotion();

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (question: string) => {
    setOpenQuestion((current) =>
      current === question ? null : question
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="
        relative
        overflow-hidden
        bg-[var(--background)]
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:px-8
        md:py-20
        lg:px-12
        lg:py-24
        xl:py-28
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[15%]
          h-[360px]
          w-[520px]
          -translate-x-1/2
          rounded-full
          blur-[110px]
          sm:h-[440px]
          sm:w-[620px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [0.94, 1.06, 0.94],
                x: ["-50%", "-47%", "-50%"],
                y: [0, -15, 0],
                opacity: [0.35, 0.52, 0.35],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(199,184,245,0.22), rgba(185,216,239,0.09), rgba(242,217,223,0.06), transparent 70%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-[48%]
          h-[240px]
          w-[240px]
          rounded-full
          blur-[95px]
          sm:h-[300px]
          sm:w-[300px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, 25, 0],
                opacity: [0.18, 0.32, 0.18],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(154,135,201,0.15), transparent 70%)",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          variants={sectionVariants}
          className="
            mx-auto
            mb-8
            max-w-3xl
            text-center
            sm:mb-10
            lg:mb-12
          "
        >
          {/* Eyebrow */}

          <motion.div variants={itemVariants}>
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#C6BDDC]/50
                bg-white/65
                px-3
                py-1.5
                shadow-[0_8px_30px_rgba(80,65,100,0.05)]
                backdrop-blur-xl
              "
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F2EFF8]">
                <HelpCircle
                  className="h-3 w-3 text-[#7769A3]"
                  strokeWidth={1.7}
                />
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#5A5180] sm:text-[9px]">
                Clear Answers
              </span>
            </span>
          </motion.div>

          {/* Heading */}

          <motion.h2
            id="faq-heading"
            variants={itemVariants}
            className="
              mt-4
              font-serif
              text-[2rem]
              font-medium
              leading-[1.04]
              tracking-[-0.045em]
              text-[#1A1B1F]
              sm:mt-5
              sm:text-4xl
              md:text-5xl
            "
          >
            Questions are part
            <br />
            of the{" "}
            <span className="bg-gradient-to-r from-[#7669A3] via-[#9A87C9] to-[#739DB8] bg-clip-text italic text-transparent">
              journey.
            </span>
          </motion.h2>

          {/* Description */}

          <motion.p
            variants={itemVariants}
            className="
              mx-auto
              mt-3
              max-w-xl
              px-2
              text-[13px]
              leading-6
              text-[#2B2D33]/65
              sm:mt-4
              sm:px-0
              sm:text-sm
            "
          >
            Starting something new can come with uncertainty. Here are a few
            answers to help you take your next step with more clarity.
          </motion.p>
        </motion.div>

        {/* =================================================
            CATEGORY FILTER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
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
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-6 flex justify-center sm:mb-7"
        >
          <div
            className="
              flex
              max-w-full
              overflow-x-auto
              rounded-full
              border
              border-black/[0.07]
              bg-white/50
              p-1
              shadow-[0_10px_35px_rgba(70,60,90,0.05)]
              backdrop-blur-xl
              scrollbar-hide
            "
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenQuestion(null);
                  }}
                  className="
                    relative
                    shrink-0
                    rounded-full
                    px-3
                    py-2
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    transition-colors
                    duration-300
                    sm:px-4
                    sm:text-[9px]
                  "
                >
                  {active && (
                    <motion.span
                      layoutId="faq-active-category"
                      className="absolute inset-0 rounded-full bg-[#5A5180]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 ${
                      active
                        ? "text-white"
                        : "text-[#2B2D33]/55 hover:text-[#5A5180]"
                    }`}
                  >
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* =================================================
            FAQ LIST
        ================================================== */}

        <motion.div
          layout
          className="
            relative
            mx-auto
            w-full
            max-w-4xl
          "
        >
          {/* Desktop editorial line */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-6
              left-[17px]
              top-6
              hidden
              w-px
              bg-gradient-to-b
              from-transparent
              via-[#C6BDDC]/40
              to-transparent
              md:block
            "
          />

          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openQuestion === faq.question;

              return (
                <motion.div
                  layout
                  key={faq.question}
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative mb-2.5 sm:mb-3"
                >
                  {/* Desktop Number */}

                  <div className="absolute left-0 top-5 z-20 hidden md:block">
                    <motion.div
                      animate={{
                        scale: isOpen ? 1.08 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        text-[8px]
                        font-semibold
                        tracking-[0.15em]
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "border-[#C6BDDC] bg-[#F2EFF8] text-[#7769A3]"
                            : "border-black/[0.08] bg-[var(--background)] text-black/35"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.div>
                  </div>

                  {/* FAQ CARD */}

                  <motion.div
                    layout
                    initial={false}
                    animate={{
                      borderColor: isOpen
                        ? "rgba(198,189,220,0.9)"
                        : "rgba(226,218,205,0.75)",
                      boxShadow: isOpen
                        ? "0 20px 55px rgba(80,65,100,0.09)"
                        : "0 6px 24px rgba(80,65,100,0.03)",
                    }}
                    whileHover={{
                      y: isOpen ? 0 : -2,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className={`
                      relative
                      ml-0
                      overflow-hidden
                      rounded-[20px]
                      border
                      bg-white/60
                      backdrop-blur-xl
                      sm:rounded-[22px]
                      md:ml-14
                      ${
                        isOpen
                          ? "bg-white/80"
                          : "hover:bg-white/75"
                      }
                    `}
                  >
                    {/* Open gradient */}

                    <motion.div
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(199,184,245,0.09), transparent 45%, rgba(185,216,239,0.08))",
                      }}
                    />

                    {/* Question */}

                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.question)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="
                        group
                        relative
                        z-10
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        gap-3
                        px-4
                        py-4
                        text-left
                        sm:gap-4
                        sm:px-6
                        sm:py-5
                      "
                    >
                      {/* Mobile number */}

                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-[7px]
                          font-semibold
                          tracking-wider
                          transition-colors
                          duration-300
                          md:hidden
                          ${
                            isOpen
                              ? "bg-[#5A5180] text-white"
                              : "bg-[#F2EFF8] text-[#7769A3]"
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Question text */}

                      <span
                        className={`
                          flex-1
                          font-serif
                          text-[14px]
                          font-medium
                          leading-snug
                          tracking-[-0.015em]
                          transition-colors
                          duration-300
                          sm:text-base
                          md:text-lg
                          ${
                            isOpen
                              ? "text-[#5A5180]"
                              : "text-[#1A1B1F] group-hover:text-[#5A5180]"
                          }
                        `}
                      >
                        {faq.question}
                      </span>

                      {/* Plus */}

                      <motion.span
                        animate={{
                          rotate: isOpen ? 45 : 0,
                          scale: isOpen ? 1.04 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition-colors
                          duration-300
                          sm:h-9
                          sm:w-9
                          ${
                            isOpen
                              ? "border-[#5A5180] bg-[#5A5180] text-white"
                              : "border-black/[0.07] bg-[#F5F2FA] text-[#5A5180] group-hover:border-[#C6BDDC]"
                          }
                        `}
                      >
                        <Plus
                          className="h-3.5 w-3.5"
                          strokeWidth={1.7}
                        />
                      </motion.span>
                    </button>

                    {/* Answer */}

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            height: {
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            },
                            opacity: {
                              duration: 0.25,
                            },
                          }}
                        >
                          <div
                            className="
                              relative
                              px-4
                              pb-5
                              sm:px-6
                              sm:pb-6
                            "
                          >
                            {/* Animated divider */}

                            <motion.div
                              initial={{
                                width: 0,
                              }}
                              animate={{
                                width: "100%",
                              }}
                              transition={{
                                duration: 0.55,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="
                                mb-4
                                h-px
                                bg-gradient-to-r
                                from-[#C6BDDC]/70
                                via-[#EDE8F5]
                                to-transparent
                                sm:mb-5
                              "
                            />

                            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                              <motion.p
                                initial={{
                                  opacity: 0,
                                  y: 8,
                                  filter: "blur(3px)",
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  filter: "blur(0px)",
                                }}
                                transition={{
                                  delay: 0.12,
                                  duration: 0.5,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="
                                  max-w-2xl
                                  text-[12px]
                                  leading-6
                                  text-[#2B2D33]/70
                                  sm:text-[13px]
                                  sm:leading-6
                                "
                              >
                                {faq.answer}
                              </motion.p>

                              <motion.div
                                initial={{
                                  opacity: 0,
                                  scale: 0.8,
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                }}
                                transition={{
                                  delay: 0.2,
                                  duration: 0.4,
                                }}
                                className="hidden sm:block"
                              >
                                <span
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#C6BDDC]/40
                                    bg-[#F5F2FA]
                                    text-[#7769A3]
                                  "
                                >
                                  <ArrowUpRight
                                    className="h-3.5 w-3.5"
                                    strokeWidth={1.5}
                                  />
                                </span>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Premium inner border */}

                    <motion.div
                      aria-hidden="true"
                      animate={{
                        opacity: isOpen ? 1 : 0,
                      }}
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[20px]
                        ring-1
                        ring-inset
                        ring-[#C6BDDC]/25
                        sm:rounded-[22px]
                      "
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* =================================================
            BOTTOM MICRO CTA
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-8
            flex
            max-w-4xl
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-black/[0.07]
            pt-5
            sm:mt-10
            sm:flex-row
            sm:gap-5
            sm:pt-6
          "
        >
          <div className="flex items-center gap-2.5">
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#F2EFF8]
              "
            >
              <Sparkles
                className="h-3 w-3 text-[#7769A3]"
                strokeWidth={1.5}
              />
            </span>

            <span className="text-[8px] uppercase tracking-[0.15em] text-[#2B2D33]/45 sm:text-[9px]">
              Still have questions?
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group
              flex
              items-center
              gap-1.5
              text-[11px]
              font-semibold
              text-[#5A5180]
            "
          >
            Talk to someone

            <ArrowUpRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
              strokeWidth={1.6}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}