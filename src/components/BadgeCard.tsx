'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { createContext, useContext } from 'react';
import Image, { ImageProps } from 'next/image';
import { Bookmark } from 'lucide-react';
import Chip from '@/components/Chip';

export const badgeCardVariants = cva(
  'flex flex-col p-0 relative overflow-hidden w-[300px] h-[321px] pt-[24px] px-[29px] pb-9 rounded-xl',
  {
    variants: {
      variant: {
        default:
          'bg-white-0 border border-gray-100 text-gray-800 hover:border-[1.5px] hover:bg-white-0 hover:text-gray-900 ',
        primary: 'bg-primary-900 text-white-0',
        secondary: 'bg-secondary-50 text-gray-900',
        disabled: 'bg-gray-50 pointer-events-none text-gray-500',
        selected: 'bg-primary-50 hover:bg-primary-50  hover:text-gray-900 border-0',
      },
      size: {
        default: '',
        wide: 'w-full h-[176px] pl-[23px] pr-0 pt-[63px] items-start text-left pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeCardVariants> {}

export const BadgeCardContext = createContext<BadgeCardProps>({ variant: 'default' });

const BadgeCard = ({ className, variant, size, ...props }: BadgeCardProps) => {
  return (
    <BadgeCardContext.Provider value={{ variant, size }}>
      <Card
        {...props}
        className={cn(badgeCardVariants({ variant, size }), className)}
      ></Card>
    </BadgeCardContext.Provider>
  );
};
BadgeCard.displayName = 'BadgeCard';

const BadgeWideIcon = ({
  src,
  alt,
  className,
  priority = false,
  ...props
}: ImageProps) => {
  return (
    <div
      className="w-[310px] absolute right-[-80px] sm:right-[-60%]"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '100%',
        width: '309.33px',
        height: '309.33px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 75.5%)',
      }}
    >
      <Image
        src={src}
        className={cn('absolute', className)}
        alt={alt}
        {...props}
        width={220}
        height={220}
        style={{
          top: '50%',
          right: '15%',
          transform: 'translateY(-50%)',
        }}
        priority={priority}
      />
    </div>
  );
};
BadgeWideIcon.displayName = 'BadgeWideIcon';

const BadgeIcon = ({ src, alt, className, ...props }: ImageProps) => {
  const { variant } = useContext(BadgeCardContext);

  return (
    <>
      {variant === 'selected' && (
        <div
          className="w-[200px] h-[200px] absolute"
          style={{
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '100%',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 75.5%)',
          }}
        />
      )}
      <Image
        src={src}
        className={cn('mx-auto mb-4 relative', className)}
        alt={alt}
        {...props}
        width={100}
        height={100}
      />
    </>
  );
};
BadgeIcon.displayName = 'BadgeIcon';

const BadgeCardChip = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { variant } = useContext(BadgeCardContext);

  return (
    <Chip
      {...props}
      variant="secondary"
      className={cn(variant === 'disabled' && 'bg-gray-200 text-white-0')}
    />
  );
};
BadgeCardChip.displayName = 'BadgeCardChip';

const BadgeCardHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { variant } = useContext(BadgeCardContext);

  const bookmarkColor = variant !== 'selected' ? '#BEBFBF' : '#002861';
  return (
    <CardHeader
      {...props}
      className={cn('flex justify-between h-6', variant === 'primary' && 'text-white-0')}
    >
      {children}
      {variant !== 'disabled' && (
        <Bookmark className="ml-auto" color={bookmarkColor} fill={bookmarkColor} />
      )}
    </CardHeader>
  );
};
BadgeCardHeader.displayName = 'BadgeCardHeader';

const BadgeCardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <CardTitle {...props} className={cn('font-sb22')} />;
};
BadgeCardTitle.displayName = 'BadgeCardTitle';

const BadgeCardDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { variant } = useContext(BadgeCardContext);

  return (
    <CardDescription
      {...props}
      className={cn('font-r16 mt-2', variant === 'disabled' && 'text-gray-400')}
    />
  );
};

BadgeCardDescription.displayName = 'BadgeCardDescription';

const BadgeCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { size } = useContext(BadgeCardContext);

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        'z-[1]',
        size !== 'wide' && 'mt-6 items-center text-center',
        className,
      )}
    />
  );
});

BadgeCardContent.displayName = 'BadgeCardContent';
const BadgeCardFooter = CardFooter;
BadgeCardFooter.displayName = 'BadgeCardFooter';

export {
  BadgeCard,
  BadgeCardHeader,
  BadgeCardChip,
  BadgeCardFooter,
  BadgeCardTitle,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeWideIcon,
  BadgeIcon,
};
