import { useContext } from 'react';
import Navbar from './components/navbar';
import { Button } from './components/ui/button';
import { FleetContext } from './context/store';

export default function App() {
  const state = useContext(FleetContext);

  console.log(state);

  return (
    <>
      <Navbar />
      <div className='flex min-h-screen w-full flex-col items-center justify-center gap-y-5'>
        <h1 className='text-3xl font-bold underline'>Hello React...!</h1>

        <div className='p-4 pt-2'>
          <Button>Click Me</Button>
        </div>
      </div>
    </>
  );
}
