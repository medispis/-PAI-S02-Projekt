import { useState } from 'react';
import { FUEL_TYPES, VEHICLE_STATUSES } from '../data/vehicles.js';

export default function VehicleForm({ vehicle, onSave, onCancel }) {
  const [name, setName] = useState(vehicle?.name ?? '');
  const [registration, setRegistration] = useState(vehicle?.registration ?? '');
  const [fuel, setFuel] = useState(vehicle?.fuel ?? '');
  const [status, setStatus] = useState(vehicle?.status ?? 'available');
  const [insured, setInsured] = useState(vehicle?.insured ?? false);
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Podaj nazwę.';
    if (!registration.trim()) nextErrors.registration = 'Podaj numer rejestracyjny.';
    if (!fuel) nextErrors.fuel = 'Wybierz paliwo.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0]).focus();
      return;
    }
    onSave({ name: name.trim(), registration: registration.trim(), fuel, status, insured });
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <label>Nazwa
        <input name="name" type="text" required value={name} onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} data-dialog-autofocus />
      </label>
      {errors.name && <p className="error" id="name-error" role="alert">{errors.name}</p>}

      <label>Numer rejestracyjny
        <input name="registration" type="text" required value={registration} onChange={(event) => setRegistration(event.target.value)}
          aria-invalid={Boolean(errors.registration)} aria-describedby={errors.registration ? 'registration-error' : undefined} />
      </label>
      {errors.registration && <p className="error" id="registration-error" role="alert">{errors.registration}</p>}

      <label htmlFor="form-fuel">Paliwo</label>
      <select id="form-fuel" name="fuel" required value={fuel} onChange={(event) => setFuel(event.target.value)}
        aria-invalid={Boolean(errors.fuel)} aria-describedby={errors.fuel ? 'fuel-error' : undefined}>
        <option value="">Wybierz</option>
        {FUEL_TYPES.map((type) => <option key={type}>{type}</option>)}
      </select>
      {errors.fuel && <p className="error" id="fuel-error" role="alert">{errors.fuel}</p>}

      <fieldset>
        <legend>Status</legend>
        {Object.entries(VEHICLE_STATUSES).map(([value, label]) => (
          <label className="choice" key={value}>
            <input type="radio" name="status" value={value} checked={status === value} onChange={(event) => setStatus(event.target.value)} />
            {label}
          </label>
        ))}
      </fieldset>
      <label className="choice">
        <input type="checkbox" checked={insured} onChange={(event) => setInsured(event.target.checked)} />
        Ważne ubezpieczenie
      </label>
      <div className="actions">
        <button type="button" onClick={onCancel}>Anuluj</button>
        <button type="submit">Zapisz</button>
      </div>
    </form>
  );
}
