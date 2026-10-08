import { VEHICLE_STATUSES } from '../data/vehicles.js';

export default function VehicleCard({ vehicle, onEdit, onDelete }) {
  return (
    <article className="vehicle-card">
      <h2>{vehicle.name}</h2>
      <p>Rejestracja: {vehicle.registration}</p>
      <p>Paliwo: {vehicle.fuel}</p>
      <p>Status: {VEHICLE_STATUSES[vehicle.status]}</p>
      <p>Ubezpieczenie: {vehicle.insured ? 'Ważne' : 'Brak'}</p>
      <div className="actions">
        <button onClick={() => onEdit(vehicle)} aria-label={`Edytuj ${vehicle.name}`}>Edytuj</button>
        <button onClick={() => onDelete(vehicle)} aria-label={`Usuń ${vehicle.name}`}>Usuń</button>
      </div>
    </article>
  );
}
