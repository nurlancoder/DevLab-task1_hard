import React from "react";
import { staffList } from "../data/staff";

export default function StaffStep({ selected, onSelect, onNext }) {
  return (
    <div className="step-container">
      <h3 className="step-title">Həkim seçin</h3>
      <div className="staff-list">
        {staffList.map((staff) => (
          <div
            key={staff.id}
            className={`staff-card ${selected?.id === staff.id ? "selected" : ""}`}
            onClick={() => onSelect(staff)}
          >
            <img src={staff.avatar} alt={staff.name} className="staff-avatar" />
            <div className="staff-info">
              <div className="staff-name">{staff.name}</div>
              <div className="staff-email">{staff.email}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="nav-btns">
        <div></div> {/* Empty div for flex spacing */}
        <button 
          className="btn-next" 
          disabled={!selected} 
          onClick={onNext}
        >
          İrəli
        </button>
      </div>
    </div>
  );
}