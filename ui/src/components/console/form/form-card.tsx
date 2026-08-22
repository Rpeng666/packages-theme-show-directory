'use client';

import { Fragment, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { useThemeComponent } from '../../../context';
import { ConsoleLink } from '../bridge';
import { Form } from './index';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/breadcrumb';
import { cn } from '../../../lib/utils';
import { Crumb } from '../../../contracts/features/common';
import { Form as FormType } from '../../../contracts/features/form';

export function FormCard({
  title,
  description,
  crumbs,
  form,
  className,
  collapsible = false,
  defaultCollapsed = false,
}: {
  title?: string;
  description?: string;
  crumbs?: Crumb[];
  form: FormType;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}) {
  // Resolve the active theme's Card/Button (Semi under the semi theme, shadcn
  // under default) so console cards render the theme-native surface.
  const Card = useThemeComponent('Card');
  const Button = useThemeComponent('Button');
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const titleNode =
    title || collapsible ? (
      <span className="flex items-center gap-2">
        {title}
        {collapsible && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          </Button>
        )}
      </span>
    ) : undefined;

  return (
    <Card
      className={cn(className)}
      title={titleNode}
      description={
        description ? (
          <span dangerouslySetInnerHTML={{ __html: description }} />
        ) : undefined
      }
    >
      {crumbs && crumbs.length > 0 && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {crumbs.map((crumb, index) => (
              <Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {crumb.is_active ? (
                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                  ) : (
                    <ConsoleLink href={crumb.url || ''}>{crumb.title}</ConsoleLink>
                  )}
                </BreadcrumbItem>
                {index < crumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {form && (
        <div className={cn(collapsible && isCollapsed && 'hidden')}>
          <Form {...form} />
        </div>
      )}
    </Card>
  );
}