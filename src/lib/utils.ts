import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Initial Vehicles
export const vehicles = [
  {
    id: 'b8e1f10e-0f51-4b7f-9ef7-6de78b0d97c2',
    name: 'Tesla Model S',
    batteryPercentage: 85,
    totalDistance: 120.5,
    lastChargeTime: '2024-10-25T10:30:00Z',
    status: 'In Transit',
  },
  {
    id: 'e83c0e7e-c5d4-4ebf-b3ee-e4f2e9f3d35e',
    name: 'Audi e-tron',
    batteryPercentage: 55,
    totalDistance: 200.7,
    lastChargeTime: '2024-10-24T15:00:00Z',
    status: 'On Charge',
  },
  {
    id: 'ea30f79f-fec5-41c8-9bfa-c1c2c5a63407',
    name: 'BMW i4',
    batteryPercentage: 100,
    totalDistance: 300.0,
    lastChargeTime: '2024-10-25T08:00:00Z',
    status: 'Idle',
  },
  {
    id: 'a4f3c74a-792f-4c31-9447-cc28b30b1161',
    name: 'Nissan Leaf',
    batteryPercentage: 20,
    totalDistance: 50.3,
    lastChargeTime: '2024-10-24T20:15:00Z',
    status: 'In Transit',
  },
  {
    id: 'd1b51af0-1a4b-4f59-bb64-e82b6452ed5d',
    name: 'Chevrolet Bolt EV',
    batteryPercentage: 75,
    totalDistance: 150.4,
    lastChargeTime: '2024-10-25T09:00:00Z',
    status: 'Idle',
  },
  {
    id: 'f3d2e91e-635a-4d0d-a44e-9a2d5279dfde',
    name: 'Ford Mustang Mach-E',
    batteryPercentage: 90,
    totalDistance: 180.3,
    lastChargeTime: '2024-10-25T12:45:00Z',
    status: 'In Transit',
  },
  {
    id: 'c7b6e234-5f28-4c35-9f7d-8ae7d4c3d21a',
    name: 'Hyundai Kona Electric',
    batteryPercentage: 65,
    totalDistance: 210.8,
    lastChargeTime: '2024-10-24T16:30:00Z',
    status: 'On Charge',
  },
  {
    id: 'ab34de56-92cd-4d4e-a6b8-123b9a7f6c89',
    name: 'Porsche Taycan',
    batteryPercentage: 45,
    totalDistance: 330.5,
    lastChargeTime: '2024-10-25T06:15:00Z',
    status: 'Idle',
  },
  {
    id: 'd45e8c2b-7a5d-4f92-b3c4-e56f7898f234',
    name: 'Jaguar I-PACE',
    batteryPercentage: 50,
    totalDistance: 250.0,
    lastChargeTime: '2024-10-24T18:45:00Z',
    status: 'In Transit',
  },
  {
    id: 'c23dff8a-1b2f-487c-9eeb-3bbfcd56e8e4',
    name: 'Volkswagen ID.4',
    batteryPercentage: 80,
    totalDistance: 160.2,
    lastChargeTime: '2024-10-25T11:00:00Z',
    status: 'On Charge',
  },
];
