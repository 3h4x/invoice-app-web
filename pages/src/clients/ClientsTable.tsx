import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

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

// const ComponentsWithDataTests = {
//   Row: CustomRow,
//   Cell: CustomCell,
// }

export const ClientsTable = (props: ClientsTableProps) => {
  return (
    <div style={{ height: 70 * props.clients.length, width: '100%' }}>
      <DataGrid
        // components={ComponentsWithDataTests}
        rows={props.clients}
        columns={columns}
        hideFooter
      />
    </div>
  )
}
