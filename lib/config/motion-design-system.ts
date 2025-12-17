// Motion design system configuration
// Converted from JSON to TypeScript for better build compatibility

export const motionDesignSystem = {
  meta: {
    project: "FinFlow Refinement",
    stack: "Next.js 14, Tailwind, Shadcn UI, Zustand, Framer Motion",
    description: "High-end motion system for Landing, Onboarding, and Dashboard",
    version: "5.0",
  },
  responsive: {
    breakpoints: {
      mobile: "0px",
      tablet: "768px",
      desktop: "1024px",
    },
    typography: {
      font_family: "var(--font-instrument-sans)",
      landing_hero: "clamp(2.5rem, 6vw, 5rem)",
      dashboard_balance: "clamp(2rem, 5vw, 4.5rem)",
    },
  },
  physics: {
    global_easing: [0.2, 0.0, 0.2, 1.0] as [number, number, number, number],
    spring_presets: {
      snappy: { stiffness: 180, damping: 12, mass: 1 },
      gentle: { stiffness: 100, damping: 20, mass: 1 },
      heavy: { stiffness: 120, damping: 20, mass: 2 },
    },
  },
  refinement_targets: {
    landing_page: {
      path: "app/page.tsx",
      sections: {
        hero: {
          text_reveal: "staggered_words_slide_up",
          cta_button: "magnetic_hover_effect",
          visual: "floating_glass_cards",
        },
        features_grid: {
          trigger: "whileInView",
          animation: "fade_up_stagger_0.1s",
        },
        social_proof: {
          animation: "infinite_horizontal_marquee",
        },
      },
    },
    onboarding: {
      path: "app/onboarding/page.tsx",
      transition: {
        type: "animate_presence_mode_wait",
        enter: { x: 20, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 },
      },
    },
    dashboard: {
      path: "app/dashboard/page.tsx",
      components: {
        balance_card: {
          ref: "components/dashboard/wallet-card.tsx",
          action: "implement_rolling_ticker_and_parallax",
        },
        transaction_list: {
          ref: "components/dashboard/transaction-list.tsx",
          action: "wrap_items_with_staggered_motion",
        },
      },
    },
    money_ops: {
      transfer_modal: {
        ref: "components/dashboard/transfer-modal.tsx",
        enhancement: "replace_submit_button_with_slide_to_pay",
      },
    },
  },
} as const

