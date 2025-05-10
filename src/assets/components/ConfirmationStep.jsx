import React, { useState } from "react";
import FormInput from "./FormInput";
export default function ConfirmationStep({
  staff, service, date, time,
  user, setUser, onBack, onSubmit
}) {
  const [errors, setErrors] = useState({});
  const validate = () => {
    let errs = {};
    if (!user.firstName) errs.firstName = "Ad tələb olunur";
    if (!user.lastName) errs.lastName = "Soyad tələb olunur";
    if (!user.email) errs.email = "Email tələb olunur";
    if (!user.phone) errs.phone = "Telefon tələb olunur";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = () => {
    if (validate()) onSubmit();
  };
  return (
    <div>
      <h3>Təsdiqlə</h3>
      <div className="confirmation-form">
        <FormInput label="Ad" value={user.firstName} onChange={v => setUser({ ...user, firstName: v })} required />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <FormInput label="Soyad" value={user.lastName} onChange={v => setUser({ ...user, lastName: v })} required />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
        <FormInput label="Email" value={user.email} onChange={v => setUser({ ...user, email: v })} type="email" required />
        {errors.email && <span className="error">{errors.email}</span>}
        <FormInput label="Telefon" value={user.phone} onChange={v => setUser({ ...user, phone: v })} required />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="summary">
        <b>Seçimlər:</b>
        <div>Həkim: {staff?.name}</div>
        <div>Xidmət: {service?.name}</div>
        <div>Tarix: 10-May-{date} / {time}</div>
      </div>
      <div className="nav-btns">
        <button onClick={onBack}>Geri</button>
        <button onClick={handleSubmit}>Təsdiqlə</button>
      </div>
    </div>
  );
}