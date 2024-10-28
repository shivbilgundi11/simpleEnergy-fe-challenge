import { useContext } from 'react';
import InfoTable from './info-table';
import { FleetContext } from '@/context/store';
import AddNewVehicle from './add-edit-form';

export default function VehiclesTable() {
  const { state } = useContext(FleetContext);

  return (
    <>
      <main className='container my-3 mt-3 h-auto w-full'>
        {/* ========Add-New-Vehicle-Button======== */}
        <AddNewVehicle />
        {/* ========Vehicles-Table======== */}
        <InfoTable data={state.vehicles} />
      </main>
    </>
  );
}
