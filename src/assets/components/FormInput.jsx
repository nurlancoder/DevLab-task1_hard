import React from "react";
export default function FormInput({ label, value, onChange, type = "text", required }) {
  return (
    <div className="form-input">
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
        />
      </label>
    </div>
  );
}