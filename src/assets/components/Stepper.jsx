import React from "react";

const steps = ["Həkim", "Xidmət", "Tarix və Saat", "Təsdiqləmə"];

export default function Stepper({ currentStep }) {
  return (
    <div className="stepper">
      {steps.map((step, idx) => (
        <div 
          key={step} 
          className={`step ${currentStep === idx ? "active" : ""} ${currentStep > idx ? "done" : ""}`}
        >
          <div className="circle">{idx + 1}</div>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}