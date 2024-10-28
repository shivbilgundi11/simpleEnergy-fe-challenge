import { Button } from './ui/button';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { tableSections } from '@/lib/utils';
import { MdDeleteSweep } from 'react-icons/md';
import { IoCarSportOutline } from 'react-icons/io5';
import { VehicleType } from '@/lib/types';
import { useContext } from 'react';
import { FleetContext } from '@/context/store';
import EditVehicle from './edit-vehicle';
import { DisplayBattery } from './displayers/display-battery';
import { DisplayVehStatus } from './displayers/display-status';

export default function InfoTable({ data }: { data: VehicleType[] }) {
  const { dispatch } = useContext(FleetContext);

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-gray-500 border-b border-black'>
        <TableHeader className='border bg-black dark:bg-white'>
          <TableRow className='hover:bg-black hover:dark:bg-white'>
            {tableSections?.map((section) => (
              <TableHead
                key={section.id}
                className='whitespace-nowrap text-white dark:text-black'
              >
                {section.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className='whitespace-nowrap font-bold capitalize'>
                  {vehicle.name}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  <DisplayBattery batteryStatus={vehicle?.batteryPercentage} />
                </TableCell>
                <TableCell className='whitespace-nowrap font-medium'>
                  {vehicle.totalDistance} km
                </TableCell>
                <TableCell className='whitespace-nowrap font-medium'>
                  {new Date(vehicle.lastChargeTime).toLocaleString()}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  <DisplayVehStatus vehicleStatus={vehicle?.status} />
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  <EditVehicle vehicleId={vehicle.id} />
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  <Button
                    variant='destructive'
                    onClick={() => {
                      dispatch({ type: 'DeleteVehicle', payload: vehicle.id });
                    }}
                  >
                    <MdDeleteSweep />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter className='min-w-full'>
          <TableRow className='w-full'>
            <TableCell colSpan={6} className='whitespace-nowrap'>
              Total Vehicles
            </TableCell>
            <TableCell className='inline-flex items-center gap-x-2 whitespace-nowrap text-right text-lg font-bold'>
              <IoCarSportOutline size={32} />
              {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </table>
    </div>
  );
}
