import { useState } from 'react';
import { FUEL_TYPES, initialVehicles } from './data/vehicles.js';
import Dialog from './components/Dialog.jsx';
import VehicleForm from './components/VehicleForm.jsx';
import VehicleCard from './components/VehicleCard.jsx';
import Pagination from './components/Pagination.jsx';

export default function App() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [search, setSearch] = useState('');
  const [fuel, setFuel] = useState('');
  const [sort, setSort] = useState('asc');
  const [requestedPage, setRequestedPage] = useState(1);
  const [dialog, setDialog] = useState(null);

  const visibleVehicles = vehicles
    .filter((vehicle) => vehicle.name.toLocaleLowerCase('pl').includes(search.trim().toLocaleLowerCase('pl')) && (!fuel || vehicle.fuel === fuel))
    .sort((a, b) => sort === 'asc' ? a.name.localeCompare(b.name, 'pl') : b.name.localeCompare(a.name, 'pl'));
  const pageCount = Math.max(1, Math.ceil(visibleVehicles.length / 5));
  const page = Math.min(requestedPage, pageCount);
  const pageVehicles = visibleVehicles.slice((page - 1) * 5, page * 5);

  function saveVehicle(values) {
    const savedVehicle = { ...values, id: dialog.vehicle?.id ?? crypto.randomUUID() };
    setVehicles((current) => dialog.vehicle
      ? current.map((vehicle) => vehicle.id === savedVehicle.id ? savedVehicle : vehicle)
      : [...current, savedVehicle]);
    setRequestedPage(1);
    setDialog(null);
  }

  function deleteVehicle() {
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== dialog.vehicle.id));
    setRequestedPage(Math.min(page, Math.max(1, Math.ceil((visibleVehicles.length - 1) / 5))));
    setDialog(null);
  }

  return (
    <main>
      <h1>Samochody</h1>
      <button id="add-vehicle" onClick={() => setDialog({ type: 'form', vehicle: null })}>Dodaj samochód</button>

      <div className="controls">
        <label>Szukaj po nazwie
          <input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setRequestedPage(1); }} />
        </label>
        <div>
          <label htmlFor="fuel-filter">Paliwo</label>
          <select id="fuel-filter" value={fuel} onChange={(event) => { setFuel(event.target.value); setRequestedPage(1); }}>
            <option value="">Wszystkie</option>
            {FUEL_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sortowanie</label>
          <select id="sort" value={sort} onChange={(event) => { setSort(event.target.value); setRequestedPage(1); }}>
            <option value="asc">Nazwa: A–Z</option>
            <option value="desc">Nazwa: Z–A</option>
          </select>
        </div>
      </div>

      <div className="vehicle-list">
        {pageVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle}
            onEdit={(selected) => setDialog({ type: 'form', vehicle: selected })}
            onDelete={(selected) => setDialog({ type: 'delete', vehicle: selected })} />
        ))}
      </div>
      {!pageVehicles.length && <p>Brak samochodów.</p>}
      <Pagination page={page} pageCount={pageCount} onPageChange={setRequestedPage} />

      {dialog?.type === 'form' && (
        <Dialog title={dialog.vehicle ? 'Edytuj samochód' : 'Dodaj samochód'} onClose={() => setDialog(null)}>
          <VehicleForm vehicle={dialog.vehicle} onSave={saveVehicle} onCancel={() => setDialog(null)} />
        </Dialog>
      )}
      {dialog?.type === 'delete' && (
        <Dialog title="Usunąć samochód?" onClose={() => setDialog(null)}>
          <p>{dialog.vehicle.name} ({dialog.vehicle.registration})</p>
          <div className="actions">
            <button data-dialog-autofocus onClick={() => setDialog(null)}>Anuluj</button>
            <button onClick={deleteVehicle}>Usuń</button>
          </div>
        </Dialog>
      )}
    </main>
  );
}
