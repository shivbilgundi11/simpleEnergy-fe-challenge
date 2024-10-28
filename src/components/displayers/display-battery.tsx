export function DisplayBattery({ batteryStatus }: { batteryStatus: number }) {
  let batteryClass;

  if (batteryStatus <= 15) {
    batteryClass = 'bg-red-200 text-red-800';
  } else if (batteryStatus <= 65) {
    batteryClass = 'bg-orange-200 text-orange-800';
  } else {
    batteryClass = 'bg-green-200 text-green-800';
  }

  return (
    <p className={`w-max rounded-md p-[4px] px-2 font-medium ${batteryClass}`}>
      {batteryStatus}%
    </p>
  );
}
