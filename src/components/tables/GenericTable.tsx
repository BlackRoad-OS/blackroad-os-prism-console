import { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
  onRowClick?: (row: T) => void;
}

export function GenericTable<T>({ columns, data, emptyText = 'No data available', onRowClick }: GenericTableProps<T>) {
  if (data.length === 0) {
    return <p className="muted">{emptyText}</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} onClick={() => onRowClick?.(row)} className={onRowClick ? 'table-row-clickable' : undefined}>
            {columns.map((column) => (
              <td key={column.header}>{column.accessor(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
