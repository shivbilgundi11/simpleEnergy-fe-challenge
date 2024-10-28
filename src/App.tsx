import { useContext } from 'react';
import Navbar from './components/navbar';
import { FleetContext } from './context/store';
import VehiclesTable from './components/vehicle-table';

export default function App() {
  const state = useContext(FleetContext);

  console.log(state);

  return (
    <>
      <Navbar />
      <VehiclesTable />

      <footer className='container flex h-16 w-full items-center justify-center border-t'>
        <p className='text-sm font-medium tracking-wide'>
          Made by{' '}
          <a
            href='https://github.com/shivbilgundi11'
            target='_blank'
            className='hover:underline'
          >
            Shiv Bilgundi
          </a>
        </p>
      </footer>
    </>
  );
}
