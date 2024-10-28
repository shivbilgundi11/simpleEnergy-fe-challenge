import { useContext, useState } from 'react';
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
import { LuPlus } from 'react-icons/lu';
import { FleetContext } from '@/context/store';
import ToggleSimTime from './toggle-sim-time';

export default function AddNewVehicle() {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(FleetContext);

  const [vehicleName, setVehicleName] = useState('');
  const [batteryPercentage, setBatteryPercentage] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [lastChargeTime, setLastChargeTime] = useState('');
  const [status, setStatus] = useState('');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input values
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

    // Dispatch the AddNewVehicle action
    dispatch({
      type: 'AddNewVehicle',
      payload: {
        id: crypto.randomUUID(),
        name: vehicleName,
        batteryPercentage: Number(batteryPercentage),
        totalDistance: Number(totalDistance),
        lastChargeTime,
        status,
      },
    });

    // Reset form fields and close dialog
    setVehicleName('');
    setBatteryPercentage('');
    setTotalDistance('');
    setLastChargeTime('');
    setStatus('');
    setIsOpen(false);
  };

  return (
    <>
      <div className='mb-4 flex h-auto w-full items-center justify-between'>
        <ToggleSimTime />
        <Button
          onClick={() => setIsOpen(true)}
          className='border-2 bg-orange-400 text-black hover:bg-orange-400 hover:dark:bg-orange-400'
        >
          Add Vehicle <LuPlus />
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Fill in the details of the vehicle you want to add.
          </DialogDescription>

          <form className='space-y-4' onSubmit={handleAddVehicle}>
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

              <Select onValueChange={(value) => setStatus(value)}>
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
                Add Vehicle
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
