import { Button } from './components/ui/button';

export default function App() {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center gap-y-5'>
        <h1 className='text-3xl font-bold underline'>Hello React...!</h1>

        <div className='p-4 pt-2'>
          <Button>Click Me</Button>
        </div>
      </div>
    </>
  );
}
