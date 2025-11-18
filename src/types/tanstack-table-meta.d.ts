import type { RowData } from '@tanstack/table-core';

declare module '@tanstack/table-core' {
  // Augment table meta to include our custom callbacks
  interface TableMeta<TData extends RowData> {
    onDelete?: (id: string) => void;
    onToggleActive?: (id: string, value: boolean) => void;
  }
}

