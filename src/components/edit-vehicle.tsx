import { useContext, useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { FleetContext } from '@/context/store';
import { FiEdit } from 'react-icons/fi';

type EditVehicleProps = {
  vehicleId: string;
};

export default function EditVehicle({ vehicleId }: EditVehicleProps) {
  const { state, dispatch } = useContext(FleetContext);
  const [isOpen, setIsOpen] = useState(false);

  // Local state for form values
  const [vehicleName, setVehicleName] = useState('');
  const [batteryPercentage, setBatteryPercentage] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [lastChargeTime, setLastChargeTime] = useState('');
  const [status, setStatus] = useState('');

  // Fetch the latest vehicle data from context when dialog opens
  useEffect(() => {
    if (isOpen) {
      const vehicle = state.vehicles.find((v) => v.id === vehicleId);
      if (vehicle) {
        setVehicleName(vehicle.name);
        setBatteryPercentage(vehicle.batteryPercentage.toString());
        setTotalDistance(vehicle.totalDistance.toString());
        setLastChargeTime(vehicle.lastChargeTime);
        setStatus(vehicle.status);
      }
    }
  }, [isOpen, vehicleId]);

  const handleEditVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !vehicleName ||
      !batteryPercentage ||
      !totalDistance ||
      !lastChargeTime ||
      !status
    ) {
      alert('Please fill out all fields.');
      return;
    }

    if (Number(batteryPercentage) < 0 || Number(batteryPercentage) > 100) {
      alert('Battery percentage must be between 0 and 100.');
      return;
    }

    if (Number(totalDistance) < 0) {
      alert('Distance traveled must be a positive value.');
      return;
    }

    // Dispatch the UpdateVehicle action
    dispatch({
      type: 'UpdateVehicle',
      payload: {
        id: vehicleId,
        updatedData: {
          id: vehicleId,
          name: vehicleName,
          batteryPercentage: Number(batteryPercentage),
          totalDistance: Number(totalDistance),
          lastChargeTime,
          status,
        },
      },
    });

    // Close the dialog
    setIsOpen(false);
  };

  return (
    <>
      <Button variant='ghost' onClick={() => setIsOpen(true)}>
        <FiEdit />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogDescription>
            Update the details of the selected vehicle.
          </DialogDescription>

          <form className='space-y-4' onSubmit={handleEditVehicle}>
            <div className='flex flex-col gap-y-2'>
              <label htmlFor='vehicleName' className='block font-medium'>
                Vehicle Name
              </label>
              <Input
                type='text'
                id='vehicleName'
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                placeholder='Enter vehicle name'
                required
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='batteryPercentage' className='block font-medium'>
                Battery Percentage
              </label>
              <Input
                type='number'
                id='batteryPercentage'
                value={batteryPercentage}
                onChange={(e) => setBatteryPercentage(e.target.value)}
                placeholder='Enter battery percentage'
                required
                min={0}
                max={100}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='totalDistance' className='block font-medium'>
                Distance Traveled (km)
              </label>
              <Input
                type='number'
                id='totalDistance'
                value={totalDistance}
                onChange={(e) => setTotalDistance(e.target.value)}
                placeholder='Enter total distance'
                required
                min={0}
                step={'0.1'}
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='lastChargeTime' className='block font-medium'>
                Last Charged
              </label>
              <Input
                type='datetime-local'
                id='lastChargeTime'
                value={lastChargeTime}
                onChange={(e) => setLastChargeTime(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-y-2'>
              <label htmlFor='status' className='block font-medium'>
                Status
              </label>
              <Select
                onValueChange={(value) => setStatus(value)}
                value={status}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select vehicle status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value='On Charge'>On Charge</SelectItem>
                    <SelectItem value='Idle'>Idle</SelectItem>
                    <SelectItem value='In Transit'>In Transit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='flex justify-end'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit' className='ml-2'>
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
