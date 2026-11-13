"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./HowToStart.module.css";

interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  contentTitle: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  icon: (className?: string) => React.ReactNode;
}

const STEPS_DATA: StepItem[] = [
  {
    id: "join",
    stepNumber: 1,
    title: "Join DropyHub",
    contentTitle: "Join DropyHub",
    description:
      "Tell us a little about yourself and where you want to work. Our team helps you understand the available opportunities and what you need to get started.",
    bullets: [
      "Share your basic details",
      "Choose your preferred city or area",
      "Get guidance on the next steps",
    ],
    imageSrc: "/assets/About/image-102.png",
    imageAlt: "DropyHub delivery partners at hub",
    icon: (className) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.5 6.668a2 2 0 1 0-4 0a2 2 0 0 0 4 0m1 0a3 3 0 1 1-6 0a3 3 0 0 1 6 0M2 16.667c0-3.594 2.458-5.917 5.5-5.917c1.85 0 3.51.865 4.513 2.39a.5.5 0 1 1-.836.548c-.81-1.23-2.15-1.938-3.677-1.938c-2.458 0-4.5 1.843-4.5 4.917a.5.5 0 0 1-1 0M15.333 6.251a1.584 1.584 0 1 0-3.167.001a1.584 1.584 0 0 0 3.167-.001m1 0a2.584 2.584 0 1 1-5.167-.001a2.584 2.584 0 0 1 5.167.001m1.917 9.374a2.625 2.625 0 1 0-5.25 0a2.625 2.625 0 0 0 5.25 0m1 0a3.625 3.625 0 1 1-7.25 0a3.625 3.625 0 0 1 7.25 0" />
        <path d="M15.125 17.291v-3.334a.5.5 0 0 1 1 0v3.334a.5.5 0 1 1-1 0" />
        <path d="M17.292 15.125a.5.5 0 0 1 0 1h-3.334a.5.5 0 0 1 0-1z" />
      </svg>
    ),
  },
  {
    id: "verification",
    stepNumber: 2,
    title: "Complete verification",
    contentTitle: "Complete verification",
    description:
      "We guide you through the required documents and onboarding steps, so you know what is needed before you begin.",
    bullets: [
      "Submit required identity and driving documents",
      "Complete the onboarding checks",
      "Get clarity on your role and expectations",
    ],
    imageSrc: "/assets/Home/verification.png",
    imageAlt: "Verification and document approval",
    icon: (className) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="6" width="26" height="20" rx="2" />
        <circle cx="10" cy="14" r="3.5" />
        <path d="M8.5 17.5L7.5 22L10 20.5L12.5 22L11.5 17.5" />
        <line x1="17" y1="12" x2="25" y2="12" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    id: "setup",
    stepNumber: 3,
    title: "Get the right setup",
    contentTitle: "Get the right setup",
    description:
      "Need a vehicle or a place to stay? Explore the support available to eligible partners and find a setup that works for you.",
    bullets: [
      "Explore available bike rental options",
      "Ask about accommodation support",
      "Understand applicable terms and costs",
    ],
    imageSrc: "/assets/Home/right_setup.png",
    imageAlt: "Vehicle rental and partner kit setup",
    icon: (className) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M26.6684 3C27.2204 3 27.6684 3.448 27.6684 4V28H25.6684V5H6.33398V28H4.33398V4C4.33398 3.448 4.78198 3 5.33398 3H26.6684Z" />
        <path d="M29.3345 27.0002C29.5998 27.0002 29.8541 27.1056 30.0417 27.2931C30.2292 27.4806 30.3345 27.735 30.3345 28.0002C30.3345 28.2654 30.2292 28.5198 30.0417 28.7073C29.8541 28.8949 29.5998 29.0002 29.3345 29.0002H2.66895C2.40373 29.0002 2.14937 28.8949 1.96184 28.7073C1.7743 28.5198 1.66895 28.2654 1.66895 28.0002C1.66895 27.735 1.7743 27.4806 1.96184 27.2931C2.14937 27.1056 2.40373 27.0002 2.66895 27.0002H29.3345ZM10.3345 17.333V9.33301C10.3345 9.06779 10.4399 8.81344 10.6274 8.6259C10.815 8.43836 11.0693 8.33301 11.3345 8.33301C11.5998 8.33301 11.8541 8.43836 12.0417 8.6259C12.2292 8.81344 12.3345 9.06779 12.3345 9.33301V17.333C12.3345 17.5982 12.2292 17.8526 12.0417 18.0401C11.8541 18.2277 11.5998 18.333 11.3345 18.333C11.0693 18.333 10.815 18.2277 10.6274 18.0401C10.4399 17.8526 10.3345 17.5982 10.3345 17.333ZM19.6689 17.333V9.33301C19.6689 9.06779 19.7743 8.81344 19.9618 8.6259C20.1494 8.43836 20.4037 8.33301 20.6689 8.33301C20.9342 8.33301 21.1885 8.43836 21.3761 8.6259C21.5636 8.81344 21.6689 9.06779 21.6689 9.33301V17.333C21.6689 17.5982 21.5636 17.8526 21.3761 18.0401C21.1885 18.2277 20.9342 18.333 20.6689 18.333C20.4037 18.333 20.1494 18.2277 19.9618 18.0401C19.7743 17.8526 19.6689 17.5982 19.6689 17.333Z" />
        <path d="M20.6684 12.333V14.333H11.334V12.333H20.6684ZM18.6684 21.0002C19.2204 21.0002 19.6684 21.4482 19.6684 22.0002V28.0002H17.6684V23.0002H14.334V28.0002H12.334V22.0002C12.334 21.4482 12.782 21.0002 13.334 21.0002H18.6684Z" />
      </svg>
    ),
  },
  {
    id: "ride",
    stepNumber: 4,
    title: "Prepare for your first ride",
    contentTitle: "Prepare for your first ride",
    description:
      "Get familiar with the delivery platform, safety basics and the day-to-day process before heading out.",
    bullets: [
      "Understand app and order workflows",
      "Review road safety and operating guidelines",
      "Know where to go for help",
    ],
    imageSrc: "/assets/Home/first_ride.png",
    imageAlt: "Rider briefing and first ride preparation",
    icon: (className) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="22" r="3" />
        <circle cx="24" cy="22" r="3" />
        <rect x="3" y="10" width="8" height="8" rx="1" />
        <path d="M11 18h4l3 4h6" />
        <path d="M21 11l3 11" />
        <path d="M19 11h5" />
      </svg>
    ),
  },
  {
    id: "deliver",
    stepNumber: 5,
    title: "Deliver. Earn. Grow.",
    contentTitle: "Deliver. Earn. Grow.",
    description:
      "Start delivering with access to the support and partner benefits available through DropyHub. Keep building your experience and explore opportunities to grow.",
    bullets: [
      "Start accepting eligible delivery work",
      "Get help when you need it",
      "Explore bonuses, recognition and growth programmes when available",
    ],
    imageSrc: "/assets/Home/deliver.png",
    imageAlt: "Earning and delivering with DropyHub",
    icon: (className) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 7V5H8v2h5.5a4.49 4.49 0 0 1 4.45 4H8v2h9.95a4.49 4.49 0 0 1-4.45 4H8v2.345L17.617 28l1.338-1.486L10.606 19H13.5a6.504 6.504 0 0 0 6.475-6H24v-2h-4.025a6.472 6.472 0 0 0-1.795-4Z" />
      </svg>
    ),
  },
];

export const HowToStart: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>("join");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStepId((currentId) => {
        const currentIndex = STEPS_DATA.findIndex((s) => s.id === currentId);
        const nextIndex = (currentIndex + 1) % STEPS_DATA.length;
        return STEPS_DATA[nextIndex].id;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeStep = STEPS_DATA.find((s) => s.id === activeStepId) || STEPS_DATA[0];

  return (
    <div
      className={styles.howToStartContainer}
      aria-label="How to Start Onboarding"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Column: Eyebrow, Heading, Description */}
      <div className={styles.leftColumn}>
        <span className={styles.eyebrow}>
          <span className={styles.bullet} aria-hidden="true" />
          HOW TO START?
        </span>
        <h3 className={styles.heading}>Simple, Fast &amp; Effective Partnership</h3>
        <p className={styles.description}>
          Follow these simple steps to join DropyHub and start earning fast.
        </p>
      </div>

      {/* Desktop Onboarding Items (x = 15px, y = 162px) */}
      <div className={styles.stepsList} aria-label="Onboarding steps" role="tablist">
        {STEPS_DATA.map((step) => {
          const isSelected = step.id === activeStepId;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveStepId(step.id)}
              onMouseEnter={() => setActiveStepId(step.id)}
              className={`${styles.stepButton} ${isSelected ? styles.stepButtonActive : ""}`}
            >
              <span className={styles.stepNumberBadge}>0{step.stepNumber}</span>
              <span className={styles.stepIcon}>{step.icon()}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Image & Content Panel (x = 602px, y = 27px) */}
      <div className={styles.rightPanel} role="tabpanel" aria-label={activeStep.contentTitle}>
        <div className={styles.imageContainer}>
          <Image
            src={activeStep.imageSrc}
            alt={activeStep.imageAlt}
            width={670}
            height={279}
            className={styles.panelImage}
            priority
          />
        </div>

        <h4 className={styles.contentTitle}>{activeStep.contentTitle}</h4>

        <p className={styles.contentText}>{activeStep.description}</p>
      </div>

      {/* Mobile Flow */}
      <div className={styles.mobileStepsFlow}>
        {STEPS_DATA.map((step) => {
          const isSelected = step.id === activeStepId;
          return (
            <React.Fragment key={`m-${step.id}`}>
              <button
                type="button"
                onClick={() => setActiveStepId(step.id)}
                className={`${styles.stepButton} ${isSelected ? styles.stepButtonActive : ""}`}
              >
                <span className={styles.stepNumberBadge}>0{step.stepNumber}</span>
                <span className={styles.stepIcon}>{step.icon()}</span>
                <span className={styles.stepTitle}>{step.title}</span>
              </button>

              {isSelected && (
                <div className={styles.mobileCard}>
                  <div className={styles.mobileImageContainer}>
                    <Image
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      width={600}
                      height={220}
                      className={styles.mobilePanelImage}
                      priority
                    />
                  </div>
                  <div className={styles.mobileCardContent}>
                    <h4 className={styles.mobileContentTitle}>{step.contentTitle}</h4>
                    <p className={styles.mobileContentText}>{step.description}</p>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HowToStart;
