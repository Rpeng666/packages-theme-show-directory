'use client';

import { ConsoleLink } from './bridge';
import { ReactNode } from 'react';


import { Badge } from '../../themes/default/badge';
import { Button } from '../../themes/default/button';
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../themes/default/card';
import { cn } from '../../lib/utils';
import { Button as ButtonType } from '../../contracts/features/common';

import { SmartIcon } from '../smart-icon';

export function PanelCard({
  title,
  label,
  description,
  content,
  buttons,
  children,
  className,
}: {
  title?: string;
  label?: string;
  description?: string;
  content?: string;
  buttons?: ButtonType[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <CardComponent className={cn('overflow-hidden pb-0', className)}>
      {(title || description) && (
        <CardHeader>
          <CardTitle>
            {title}
            {label && (
              <Badge
                variant="outline"
                className="float-right rounded-md px-2 py-1 text-xs"
              >
                {label}
              </Badge>
            )}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {(content || children) && (
        <CardContent className="text-muted-foreground">
          {content || children}
        </CardContent>
      )}
      {buttons && buttons.length > 0 && (
        <CardFooter className="bg-muted flex justify-start gap-4 py-4">
          {buttons.map((button, idx) => (
            <Button
              key={idx}
              variant={button.variant || 'default'}
              size={button.size || 'default'}
              asChild
            >
              <ConsoleLink href={button.url || ''} target={button.target || '_self'}>
                {button.icon && <SmartIcon name={button.icon as string} />}
                {button.title}
              </ConsoleLink>
            </Button>
          ))}
        </CardFooter>
      )}
    </CardComponent>
  );
}
