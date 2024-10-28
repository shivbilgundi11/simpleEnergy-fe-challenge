import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  // Define styles based on the current theme
  const toastStyles =
    theme == 'dark'
      ? {
          toast:
            'group toast bg-white text-black border border-gray-300 shadow-lg',
          description: 'text-gray-600',
          actionButton: 'bg-blue-600 text-white',
          cancelButton: 'bg-gray-200 text-black',
        }
      : {
          toast:
            'group toast bg-black text-white border border-gray-600 shadow-lg',
          description: 'text-gray-400',
          actionButton: 'bg-blue-400 text-black',
          cancelButton: 'bg-gray-700 text-white',
        };

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast: toastStyles.toast,
          description: toastStyles.description,
          actionButton: toastStyles.actionButton,
          cancelButton: toastStyles.cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
