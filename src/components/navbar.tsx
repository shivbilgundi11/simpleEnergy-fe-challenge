import { FaGithub } from 'react-icons/fa';

import Logo from '../assets/logo.svg';
import LogoDark from '../assets/logo-dark.svg';
import { Button } from './ui/button';
import { ThemeToggle } from './ui/theme-toggle';

export default function Navbar() {
  return (
    <>
      <header className='container h-16 w-full border-b'>
        <nav className='flex h-full w-full items-center justify-between'>
          <div>
            <a href='/' className='my-auto h-full'>
              <img src={Logo} alt='PageLogo' className='block dark:hidden' />
              <img
                src={LogoDark}
                alt='PageLogo'
                className='hidden dark:block'
              />
            </a>
          </div>

          <div className='inline-flex items-center justify-center gap-x-2'>
            <ThemeToggle />
            <a
              href='https://github.com/shivbilgundi11/simple-energy-challenge'
              target='_blank'
            >
              <Button>
                <FaGithub />{' '}
                <span className='hidden sm:inline'>Source Code</span>
              </Button>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
