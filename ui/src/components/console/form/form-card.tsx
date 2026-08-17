'use client';

import { Fragment, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


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
import { Button } from '../../../themes/default/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../themes/default/card';
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
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <Card className={cn(className)}>
      {crumbs && crumbs.length > 0 && (
        <Breadcrumb className="px-6">
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

      {(title || description || collapsible) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && (
            <CardDescription
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {collapsible && (
            <CardAction>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronUp className="size-4" />
                )}
              </Button>
            </CardAction>
          )}
        </CardHeader>
      )}

      {form && (
        <CardContent className={cn(collapsible && isCollapsed && 'hidden')}>
          <Form {...form} />
        </CardContent>
      )}
    </Card>
  );
}
