'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-lg border border-neutral-200 shadow-sm p-6',
          'hover:shadow-md transition-shadow duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn('mb-4 pb-4 border-b border-neutral-200', className)}>
      {title && <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>}
      {description && (
        <p className="text-sm text-neutral-600 mt-1">{description}</p>
      )}
      {children}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={cn('', className)}>{children}</div>;
};

CardBody.displayName = 'CardBody';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn('mt-6 pt-4 border-t border-neutral-200 flex justify-end gap-3', className)}>
      {children}
    </div>
  );
};

CardFooter.displayName = 'CardFooter';
