import React from 'react'

import {
  DataGrid,
  GridCell,
  GridCellProps,
  GridColDef,
  GridRow,
  GridRowProps,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid'

type ClientsTableProps = {
  clients: Array<{
    companyDetails: {
      name: string
      address: string
      regNumber: string
      vatNumber: string
    }
    email: string
    id: string
    invoicesCount: number
    name: string
    totalBilled: number
    user_id: string
  }>
  total: number
} & SortingProps

export type SortingProps = {
  sortModel?: GridSortModel
  onSortModelChange?: (sortModel: GridSortModel) => void
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 128 },
  {
    field: 'companyDetails',
    headerName: 'Company Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.name}`,
  },
  { field: 'email', headerName: 'Email', type: 'string', width: 128 },
  { field: 'totalBilled', headerName: 'totalBilled', type: 'number', width: 128 },
]

export const CustomRow = (props: React.HTMLAttributes<HTMLDivElement> & GridRowProps) => {
  return <GridRow data-test={`client-id-${props.row.id}`} {...props} />
}

export const CustomCell = (props: GridCellProps) => {
  return <GridCell data-test={`client-id-${props.field}`} {...props} />
}

const ComponentsWithDataTests = {
  Row: CustomRow,
  Cell: CustomCell,
}

export const ClientsTable = (props: ClientsTableProps) => {
  const { clients, total, ...rest } = props
  return (
    <div style={{ height: 70 * props.clients.length, width: '100%' }}>
      <DataGrid
        components={ComponentsWithDataTests}
        rows={props.clients}
        columns={columns}
        sortModel={[]}
        onSortModelChange={(sortModel) => console.log(sortModel)}
        hideFooter
        {...rest}
      />
    </div>
  )
}
