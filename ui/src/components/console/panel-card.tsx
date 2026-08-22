'use client';

import { ConsoleLink } from './bridge';
import { ReactNode } from 'react';

import { useThemeComponent } from '../../context';
import { SmartIcon } from '../smart-icon';
import { cn } from '../../lib/utils';
import { Button as ButtonType } from '../../contracts/features/common';

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
  // Resolve the active theme's Card/Badge/Button (Semi under the semi theme,
  // shadcn under default) so console cards render the theme-native surface.
  const Card = useThemeComponent('Card');
  const Badge = useThemeComponent('Badge');
  const Button = useThemeComponent('Button');

  const titleNode =
    title || label ? (
      <span className="flex items-center gap-2">
        {title}
        {label && (
          <Badge variant="outline" tone="neutral" size="sm">
            {label}
          </Badge>
        )}
      </span>
    ) : undefined;

  const footer =
    buttons && buttons.length > 0 ? (
      <span className="flex flex-wrap items-center gap-3">
        {buttons.map((button, idx) => (
          <Button
            key={idx}
            variant={button.variant || 'default'}
            size={button.size || 'default'}
          >
            <ConsoleLink
              href={button.url || ''}
              target={button.target || '_self'}
            >
              {button.icon && <SmartIcon name={button.icon as string} />}
              {button.title}
            </ConsoleLink>
          </Button>
        ))}
      </span>
    ) : undefined;

  return (
    <Card
      className={cn(className)}
      title={titleNode}
      description={description}
      footer={footer}
    >
      {content || children}
    </Card>
  );
}