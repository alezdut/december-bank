import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { getTransactions } from '../api/account/AccountApi';
import { ONE_MINUTE, PAGE_SIZE_OPTIONS } from '../constants/constants';

const columns: GridColDef[] = [
  {
    field: 'from_account_id',
    headerName: 'Cuenta origen',
    type: 'number',
    width: 150,
    align: 'center',
  },
  {
    field: 'to_account_id',
    headerName: 'Cuenta destino',
    type: 'number',
    width: 150,
    align: 'center',
  },
  { field: 'currency_name', headerName: 'Moneda', width: 70, align: 'center' },
  {
    field: 'amount',
    headerName: 'Importe',
    type: 'number',
    width: 70,
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de transacción',
    width: 200,
    align: 'center',
  },
];
export default function TransactionList() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState({
    field: '',
    sort: '',
  });
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    hasMorePages: true,
    pageSize: 10,
    totalPages: 0,
    totalRows: 0,
  });
  const [transactions, setTransactions] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState(false);

  const getData = async (active: boolean) => {
    setLoading(true);
    const { data, pagination } = await getTransactions({
      ...paginationModel,
      page: paginationModel.page + 1,
      ...sortModel,
    });

    if (active) {
      setPaginationInfo(pagination);
      if (data !== transactions) {
        setTransactions(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const interval = setInterval(() => getData(active), ONE_MINUTE);
    getData(active);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [paginationModel, sortModel]);

  const handleSort = (model: any) => {
    setSortModel(model[0]);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        style={{
          height: 650,
          width: '100%',
        }}
      >
        <DataGrid
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          autoHeight
          rows={transactions}
          disableColumnFilter
          disableColumnMenu
          columns={columns}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          rowCount={paginationInfo.totalRows}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          onSortModelChange={handleSort}
        />
      </Box>
    </div>
  );
}
