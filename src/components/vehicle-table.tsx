import { useContext } from 'react';
import InfoTable from './info-table';
import { FleetContext } from '@/context/store';
import { Button } from './ui/button';
import { LuPlus } from 'react-icons/lu';

export default function VehiclesTable() {
  const { state } = useContext(FleetContext);

  return (
    <>
      <main className='container my-3 mt-3 h-auto w-full'>
        {/* ========Add-New-Vehicle-Button======== */}
        <div className='mb-4 flex h-auto w-full items-center justify-end'>
          <Button className='border-2 bg-orange-400 text-black hover:bg-orange-400 hover:dark:bg-orange-400'>
            Add Vehicle <LuPlus />
          </Button>
        </div>

        {/* ========Vehicles-Table======== */}
        <InfoTable data={state.vehicles} />
      </main>
    </>
  );
}
