"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./EarningsEstimator.module.css";

type VehicleType = "ev" | "petrol" | "bicycle";

interface CityOption {
  id: string;
  name: string;
}

const CITIES: CityOption[] = [
  { id: "hyderabad", name: "Hyderabad (metro)" },
  { id: "bangalore", name: "Bangalore (metro)" },
  { id: "chennai", name: "Chennai (metro)" },
  { id: "vijayawada", name: "Vijayawada and AP cities" },
  { id: "visakhapatnam", name: "Visakhapatnam" },
];

export const EarningsEstimator: React.FC = () => {
  const [vehicle, setVehicle] = useState<VehicleType>("ev");
  const [cityId, setCityId] = useState<string>("hyderabad");
  const [ordersPerDay, setOrdersPerDay] = useState<number>(24);
  const [workingDays, setWorkingDays] = useState<number>(24);
  const [showStatusNote, setShowStatusNote] = useState<boolean>(false);

  // Exact reference figures matching Figma vector stream
  const referenceFigures = {
    baseDeliveryFee: "₹30,139",
    bonuses: "+₹4,800",
    savings: "+₹3,800",
    savingsLabel: "EV Battery & Fuel Savings",
    total: "₹38,739",
    dailyAverage: "Approx. ₹1,490 per working day",
  };

  const handleCtaClick = () => {
    setShowStatusNote(true);
    setTimeout(() => {
      setShowStatusNote(false);
    }, 4500);
  };

  // Helper for split dark/grey track segment
  const getSliderTrackStyle = (val: number, min: number, max: number) => {
    const percent = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #111111 0%, #111111 ${percent}%, #e2e2e8 ${percent}%, #e2e2e8 100%)`,
    };
  };

  return (
    <section className={styles.estimatorSection} aria-label="Interactive Earnings Estimator">
      <div className={styles.estimatorContainer}>
        <div className={styles.railLeft} aria-hidden="true" />
        <div className={styles.railRight} aria-hidden="true" />
        {/* 1. Section Heading (x=100px, y=38px) */}
        <div className={styles.headerArea}>
          <span className={styles.eyebrow}>
            <span className={styles.bullet} aria-hidden="true" />
            INTERACTIVE ESTIMATOR
          </span>
          <h2 className={styles.sectionTitle}>Calculate Your Monthly Take-Home</h2>
        </div>

        {/* 2. Main Desktop Geometry (x=94px, y=113px, width=1252px) */}
        <div className={styles.mainContent}>
          {/* Left Column: 4 Input Panels (width=612px) */}
          <div className={styles.leftColumn}>
            {/* Panel 1: Vehicle type */}
            <div className={`${styles.panelBase} ${styles.panelVehicle}`}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.stepNumber}>1. </span>Choose Your Vehicle Type
                </h3>
              </div>
              <div className={styles.vehicleRow}>
                {/* 1. EV Electric Scooter */}
                <button
                  type="button"
                  className={`${styles.vehicleBtnBase} ${styles.vehicleBtnEV} ${
                    vehicle === "ev" ? styles.vehicleBtnActive : ""
                  }`}
                  onClick={() => setVehicle("ev")}
                  aria-pressed={vehicle === "ev"}
                >
                  <div className={styles.vehicleIconWrapper}>
                    <Image
                      src={vehicle === "ev" ? "/assets/icons/colored-bicycle.svg" : "/assets/icons/bicycle.svg"}
                      alt=""
                      width={19}
                      height={21}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={vehicle === "ev" ? styles.vehicleBtnTextActive : styles.vehicleBtnText}>
                    EV Electric Scooter
                  </span>
                </button>

                {/* 2. Petrol Bike */}
                <button
                  type="button"
                  className={`${styles.vehicleBtnBase} ${styles.vehicleBtnPetrol} ${
                    vehicle === "petrol" ? styles.vehicleBtnActive : ""
                  }`}
                  onClick={() => setVehicle("petrol")}
                  aria-pressed={vehicle === "petrol"}
                >
                  <div className={styles.vehicleIconWrapper}>
                    <Image
                      src={vehicle === "petrol" ? "/assets/icons/colored-bicycle.svg" : "/assets/icons/bicycle.svg"}
                      alt=""
                      width={19}
                      height={21}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={vehicle === "petrol" ? styles.vehicleBtnTextActive : styles.vehicleBtnText}>
                    Petrol Bike (Own)
                  </span>
                </button>

                {/* 3. E-Cycle */}
                <button
                  type="button"
                  className={`${styles.vehicleBtnBase} ${styles.vehicleBtnBicycle} ${
                    vehicle === "bicycle" ? styles.vehicleBtnActive : ""
                  }`}
                  onClick={() => setVehicle("bicycle")}
                  aria-pressed={vehicle === "bicycle"}
                >
                  <div className={styles.vehicleIconWrapper}>
                    <Image
                      src={vehicle === "bicycle" ? "/assets/icons/colored-bicycle.svg" : "/assets/icons/bicycle.svg"}
                      alt=""
                      width={19}
                      height={21}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={vehicle === "bicycle" ? styles.vehicleBtnTextActive : styles.vehicleBtnText}>
                    E-Cycle / Bicycle
                  </span>
                </button>
              </div>
            </div>

            {/* Panel 2: Operating city */}
            <div className={`${styles.panelBase} ${styles.panelCity}`}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.stepNumber}>2. </span>Select Operating City
                </h3>
              </div>
              <div className={styles.cityGrid}>
                {CITIES.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    className={`${styles.cityBtn} ${
                      cityId === city.id ? styles.cityBtnActive : ""
                    }`}
                    onClick={() => setCityId(city.id)}
                    aria-pressed={cityId === city.id}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel 3: Deliveries slider */}
            <div className={`${styles.panelBase} ${styles.panelDeliveries}`}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.stepNumber}>3. </span>Expected Deliveries Per Day
                </h3>
                <span className={styles.panelValueBadge}>
                  <strong className={styles.boldNumber}>{ordersPerDay}</strong> Orders per day
                </span>
              </div>
              <div className={styles.sliderArea}>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={ordersPerDay}
                  onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                  style={getSliderTrackStyle(ordersPerDay, 10, 40)}
                  className={styles.rangeInput}
                  aria-label="Expected Deliveries Per Day"
                />
                <div className={styles.sliderLabels}>
                  <span className={styles.sliderLabelText}>Part - time (10-15)</span>
                  <span className={styles.sliderLabelText}>Standard (20 - 25)</span>
                  <span className={styles.sliderLabelText}>Peak Earnings (30 - 40)</span>
                </div>
              </div>
            </div>

            {/* Panel 4: Working days slider */}
            <div className={`${styles.panelBase} ${styles.panelDays}`}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.stepNumber}>4. </span>Working Days Per Month
                </h3>
                <span className={styles.panelValueBadge}>
                  <strong className={styles.boldNumber}>{workingDays}</strong> days
                </span>
              </div>
              <div className={styles.sliderArea}>
                <input
                  type="range"
                  min="16"
                  max="30"
                  step="1"
                  value={workingDays}
                  onChange={(e) => setWorkingDays(Number(e.target.value))}
                  style={getSliderTrackStyle(workingDays, 16, 30)}
                  className={styles.rangeInput}
                  aria-label="Working Days Per Month"
                />
                <div className={styles.sliderLabels}>
                  <span className={styles.sliderLabelText}>4 days/week</span>
                  <span className={styles.sliderLabelText}>5-6 days/week</span>
                  <span className={styles.sliderLabelText}>Full throttle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Earnings Summary Card (width=603px) */}
          <div className={styles.rightColumn}>
            <div className={styles.earningsContent}>
              <h3 className={styles.earningsHeading}>Monthly Estimated Net Earnings</h3>

              <div className={styles.breakdownList}>
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>Base Delivery Fee</span>
                  <span className={styles.breakdownValue}>
                    {referenceFigures.baseDeliveryFee}
                  </span>
                </div>

                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>Target &amp; Weekly Bonuses</span>
                  <span className={`${styles.breakdownValue} ${styles.positiveValue}`}>
                    {referenceFigures.bonuses}
                  </span>
                </div>

                <div className={styles.breakdownRowLast}>
                  <span className={styles.breakdownLabel}>
                    {referenceFigures.savingsLabel}
                  </span>
                  <span className={`${styles.breakdownValue} ${styles.positiveValue}`}>
                    {referenceFigures.savings}
                  </span>
                </div>
              </div>

              <div className={styles.dashedDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <div className={styles.totalAmountArea}>
                  <span className={styles.totalAmount}>{referenceFigures.total}</span>
                  <span className={styles.totalPeriod}>/ month</span>
                </div>
              </div>

              <p className={styles.dailyAverage}>{referenceFigures.dailyAverage}</p>

              <button
                type="button"
                className={styles.ctaButton}
                onClick={handleCtaClick}
              >
                Lock In This Rate &amp; Apply Now
              </button>

              {showStatusNote && (
                <p className={styles.integrationNote} role="status">
                  Integration with partner onboarding portal in progress.
                </p>
              )}

              <p className={styles.supportingText}>
                48-hour onboarding • ₹0 security deposit • No paperwork hassle
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Full-Viewport Hatched Divider (Frame 334) at Section Bottom */}
      <div className={styles.bottomDivider} aria-hidden="true">
        <div className={styles.bottomDividerPattern} />
        <div className={styles.bottomDividerInner}>
          <div className={styles.brokenRailLeft}>
            <svg width="2" height="40" viewBox="0 0 2 40" fill="none" style={{ display: "block" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="40"
                stroke="#c3c4c8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
          <div className={styles.brokenRailRight}>
            <svg width="2" height="40" viewBox="0 0 2 40" fill="none" style={{ display: "block" }}>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="40"
                stroke="#c3c4c8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningsEstimator;
