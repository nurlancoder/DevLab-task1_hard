import React, { useState } from "react";
export default function DateStep({ selectedDate, selectedTime, onSelectDate, onSelectTime, onNext, onBack }) {
  const [month, setMonth] = useState(4); // May
  const [year, setYear] = useState(2025);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const times = ["9:00-9:30", "9:30-10:00", "10:00-10:30"];
  return (
    <div>
      <h3>Tarix və saat seçin</h3>
      <div className="date-time-step">
        <div>
          <div className="calendar">
            <div>
              <span>May {year}</span>
            </div>
            <div className="days">
              {days.map((d) => (
                <button
                  key={d}
                  className={selectedDate === d ? "selected" : ""}
                  onClick={() => onSelectDate(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="times">
            {times.map((t) => (
              <button
                key={t}
                className={selectedTime === t ? "selected" : ""}
                onClick={() => onSelectTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="nav-btns">
        <button onClick={onBack}>Geri</button>
        <button disabled={!selectedDate || !selectedTime} onClick={onNext}>İrəli</button>
      </div>
    </div>
  );
}