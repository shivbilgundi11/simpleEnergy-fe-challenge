import { MdOutlineElectricCar } from 'react-icons/md';
import { PiCarDuotone, PiCarProfile } from 'react-icons/pi';

export function DisplayVehStatus({ vehicleStatus }: { vehicleStatus: string }) {
  if (vehicleStatus === 'On Charge') {
    return (
      <p className='inline-flex items-center justify-center gap-x-2 rounded-lg bg-green-200 p-1 px-2 font-medium text-green-800'>
        <MdOutlineElectricCar />
        {vehicleStatus}
      </p>
    );
  }

  if (vehicleStatus === 'Idle') {
    return (
      <p className='inline-flex items-center justify-center gap-x-2 rounded-lg bg-gray-200 p-1 px-2 font-medium text-gray-800'>
        <PiCarDuotone /> {vehicleStatus}
      </p>
    );
  }

  return (
    <p className='inline-flex items-center justify-center gap-x-2 rounded-lg bg-orange-200 p-1 px-2 font-medium text-orange-800'>
      <PiCarProfile /> {vehicleStatus}
    </p>
  );
}
