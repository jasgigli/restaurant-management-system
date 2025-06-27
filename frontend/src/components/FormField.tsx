import { forwardRef } from 'react';
import { cn } from './ui/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      <label className="block font-medium mb-1">{label}</label>
      <input
        ref={ref}
        className={cn(
          'border rounded px-2 py-1 w-full',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  )
);
FormField.displayName = 'FormField';
