'use client';


import { ConsoleLink } from '../bridge';
import { Pagination } from '../../common/pagination';
import { SmartIcon } from '../../smart-icon';
import { Tabs } from '../../common/tabs';
import { Table } from './index';
import { Button } from '../../../themes/default/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../themes/default/card';
import { cn } from '../../../lib/utils';
import {
  Button as ButtonType,
  Tab as TabType,
} from '../../../contracts/features/common';
import { Table as TableType } from '../../../contracts/features/table';

export function TableCard({
  title,
  description,
  buttons,
  tabs,
  table,
  className,
}: {
  title?: string;
  description?: string;
  buttons?: ButtonType[];
  tabs?: TabType[];
  table: TableType;
  className?: string;
}) {
  return (
    <Card className={cn(className)}>
      {(title || description || buttons) && (
        <CardHeader className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col gap-2">
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex-1"></div>
          {buttons && buttons.length > 0 && (
            <div className="flex items-center gap-2">
              {buttons.map((button, idx) => (
                <Button
                  key={idx}
                  asChild
                  variant={button.variant || 'default'}
                  size={button.size || 'sm'}
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
            </div>
          )}
        </CardHeader>
      )}

      {table && (
        <CardContent>
          {tabs && tabs.length > 0 ? <Tabs tabs={tabs} /> : null}
          <Table {...table} />
        </CardContent>
      )}

      {table.pagination && (
        <CardFooter>
          <Pagination {...table.pagination} />
        </CardFooter>
      )}
    </Card>
  );
}
