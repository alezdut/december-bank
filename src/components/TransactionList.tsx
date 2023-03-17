import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { getTransactions } from '../api/account/AccountApi';

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
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = React.useState({
    field: '',
    sort: '',
  });
  const [paginationInfo, setPaginationInfo] = React.useState({
    currentPage: 1,
    hasMorePages: true,
    pageSize: 10,
    totalPages: 0,
    totalRows: 0,
  });
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState(false);

  const getData = async (active: boolean) => {
    setLoading(true);
    const { data, pagination } = await getTransactions({
      ...paginationModel,
      page: paginationModel.page + 1,
      ...sortModel,
    });

    if (!active) {
      return;
    }
    setPaginationInfo(pagination);
    if (data !== rows) {
      setRows(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let active = true;
    const interval = setInterval(() => getData(active), 100000);
    getData(active);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [paginationModel, sortModel]);

  const handleSort = (e: any) => {
    setSortModel(e[0]);
  };

  return (
    <div
      style={{
        height: 650,
        width: '100%',
      }}
    >
      <DataGrid
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        rows={rows}
        disableColumnFilter
        disableColumnMenu
        columns={columns}
        pagination
        paginationModel={paginationModel}
        pageSizeOptions={[10]}
        rowCount={paginationInfo.totalRows}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        onSortModelChange={handleSort}
      />
    </div>
  );
}
