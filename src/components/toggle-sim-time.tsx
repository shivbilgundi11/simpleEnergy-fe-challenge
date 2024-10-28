import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FleetContext } from '@/context/store';
import { useContext, useState } from 'react';

export default function ToggleSimTime() {
  const { state, dispatch } = useContext(FleetContext);
  const [selectedInterval, setSelectedInterval] = useState(
    state.simulationTime.toString(),
  );

  const handleIntervalChange = (value: string) => {
    setSelectedInterval(value);
    dispatch({ type: 'UpdateSimInterval', payload: Number(value) });
  };

  return (
    <Select value={selectedInterval} onValueChange={handleIntervalChange}>
      <SelectTrigger className='w-auto font-medium sm:w-[180px] md:w-[200px]'>
        <SelectValue placeholder='Select Simulation Interval' />
      </SelectTrigger>
      <SelectContent className='font-medium'>
        <SelectGroup>
          <SelectLabel>Select Sim. Time...</SelectLabel>
          <SelectItem value='4000'>4 Seconds</SelectItem>
          <SelectItem value='10000'>10 Seconds</SelectItem>
          <SelectItem value='20000'>20 Seconds</SelectItem>
          <SelectItem value='60000'>1 Minute</SelectItem>
          <SelectItem value='180000'>3 Minutes</SelectItem>
          <SelectItem value='600000'>10 Minutes</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
