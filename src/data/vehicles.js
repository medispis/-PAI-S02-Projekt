export const FUEL_TYPES = ['Benzyna', 'Diesel', 'Hybryda', 'Elektryczny', 'LPG'];

export const VEHICLE_STATUSES = {
  available: 'Dostępny',
  inUse: 'W trasie',
  service: 'W serwisie',
};

export const initialVehicles = [
  { id: 'car-1', name: 'Toyota Corolla', registration: 'WA 1234A', fuel: 'Hybryda', insured: true, status: 'available' },
  { id: 'car-2', name: 'Skoda Octavia', registration: 'KR 5821B', fuel: 'Diesel', insured: true, status: 'inUse' },
  { id: 'car-3', name: 'Volkswagen Golf', registration: 'PO 9032C', fuel: 'Benzyna', insured: true, status: 'available' },
  { id: 'car-4', name: 'Kia Niro', registration: 'GD 2468D', fuel: 'Hybryda', insured: true, status: 'inUse' },
  { id: 'car-5', name: 'Renault Clio', registration: 'DW 7142E', fuel: 'LPG', insured: false, status: 'service' },
  { id: 'car-6', name: 'Mazda RX-7 FD', registration: 'APEX S1L', fuel: 'Premix', insured: true, status: 'service' },
  { id: 'car-7', name: 'Ford Focus', registration: 'LU 3690G', fuel: 'Diesel', insured: true, status: 'service' },
  { id: 'car-8', name: 'Hyundai i30', registration: 'RZ 4527H', fuel: 'Benzyna', insured: true, status: 'available' },
  { id: 'car-9', name: 'Dacia Duster', registration: 'BI 6108J', fuel: 'LPG', insured: false, status: 'available' },
  { id: 'car-10', name: 'Peugeot 308', registration: 'EL 1923K', fuel: 'Diesel', insured: true, status: 'inUse' },
  { id: 'car-11', name: 'Nissan Leaf', registration: 'ZS 5740L', fuel: 'Elektryczny', insured: true, status: 'available' },
  { id: 'car-12', name: 'Opel Astra', registration: 'KA 8026M', fuel: 'Benzyna', insured: false, status: 'service' },
  { id: 'car-13', name: 'Koenigsegg Jesko', registration: 'TOO FAST', fuel: 'Etanol', insured: true, status: 'available'},
];
// yes i know 6 and 13 has non selectable fuel, its added as easter egg, pun intended
