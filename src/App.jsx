import React, { useState } from "react";
import Stepper from "./components/Stepper";
import StaffStep from "./components/StaffStep";
import ServiceStep from "./components/ServiceStep";
import DateStep from "./components/DateStep";
import ConfirmationStep from "./components/ConfirmationStep";
import "./styles/main.css";

export default function App() {
  const [step, setStep] = useState(0);
  const [staff, setStaff] = useState(null);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  
  const handleSubmit = () => {
    console.log({
      staff,
      service,
      date,
      time,
      user,
    });
    alert("Rezervasiya uğurla tamamlandı! (Konsola baxın)");
    setStep(0);
    setStaff(null);
    setService(null);
    setDate(null);
    setTime(null);
    setUser({ firstName: "", lastName: "", email: "", phone: "" });
  };
  
  return (
    <div className="container">
      <Stepper currentStep={step} />
      <div className="step-content">
        {step === 0 && (
          <StaffStep
            selected={staff}
            onSelect={setStaff}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <ServiceStep
            selected={service}
            onSelect={setService}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <DateStep
            selectedDate={date}
            selectedTime={time}
            onSelectDate={setDate}
            onSelectTime={setTime}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <ConfirmationStep
            staff={staff}
            service={service}
            date={date}
            time={time}
            user={user}
            setUser={setUser}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}