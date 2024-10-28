import { FleetContext } from '@/context/store';
import { useContext } from 'react';
import { DisplayBattery } from './displayers/display-battery';

export default function VehiclesMetrics() {
  const { state } = useContext(FleetContext);
  const { vehicles, simulationTime } = state;

  const totalBattery = vehicles.reduce(
    (acc, vehicle) => acc + vehicle.batteryPercentage,
    0,
  );
  const averageBatteryPercentage =
    vehicles.length > 0 ? (totalBattery / vehicles.length).toFixed(2) : 0;

  const lowBatteryCount = vehicles.filter(
    (vehicle) => vehicle.batteryPercentage < 20,
  ).length;

  const chargingRate = 10;
  const estimatedFullChargeTimes = vehicles
    .filter((vehicle) => vehicle.status === 'On Charge')
    .map((vehicle) => {
      const batteryNeeded = 100 - vehicle.batteryPercentage;
      const estimatedTime = (batteryNeeded / chargingRate) * simulationTime;
      const estimatedTimeInMinutes = (estimatedTime / 60000).toFixed(2);
      return {
        name: vehicle.name,
        estimatedTime: estimatedTimeInMinutes,
      };
    });

  return (
    <section className='container my-8 h-auto w-full'>
      <h1 className='mb-3 text-xl font-bold'>Key Metrics:</h1>

      <ul className='font-sm flex list-disc flex-col gap-y-1 font-medium text-gray-500'>
        <li className='flex list-disc items-center gap-x-2'>
          Average Battery Percentage:{' '}
          <DisplayBattery batteryStatus={Number(averageBatteryPercentage)} />
        </li>
        <li>
          Number of vehicles with a battery below 20%:{' '}
          <big>{lowBatteryCount}</big>
        </li>
        <li>Estimated full charge time for charging vehicles:</li>
        <ul className='font-sm flex list-disc flex-col gap-y-1 font-medium text-gray-500'>
          {estimatedFullChargeTimes.length > 0 ? (
            estimatedFullChargeTimes.map(({ name, estimatedTime }) => (
              <li key={name}>
                {name}:{' '}
                <big className='text-base font-medium text-black dark:text-white'>
                  {estimatedTime}
                </big>{' '}
                Min's
              </li>
            ))
          ) : (
            <li>No vehicles currently charging.</li>
          )}
        </ul>
      </ul>
    </section>
  );
}
