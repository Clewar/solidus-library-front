import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSearch } from "../context/searchContext";
import useSWR from 'swr'
import axios from 'axios'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 80, flex: 1 },
  { field: 'name', headerName: 'Book Name', minWidth: 300, flex: 3 },
  { field: 'author', headerName: 'Author', minWidth: 200, flex: 3 },
  { field: 'publisher',headerName: 'Publisher', minWidth: 150, flex: 2 }
];

const rows = [
  { id: 1, name: 'Snow', author: 'Jon', publisher: 'p1' },
  { id: 2, name: 'Lannister', author: 'Cersei', publisher: 'p2' },
  { id: 3, name: 'Lannister', author: 'Jaime', publisher: 'p3' },
  { id: 4, name: 'Stark', author: 'Arya', publisher: 'p4' },
  { id: 5, name: 'Targaryen', author: 'Daenerys', publisher: 'p5' },
  { id: 6, name: 'Melisandre', author: 'Mariane', publisher: 'p6' },
  { id: 7, name: 'Clifford', author: 'Ferrara', publisher: 'p7' },
  { id: 8, name: 'Frances', author: 'Rossini', publisher: 'p1' },
  { id: 9, name: 'Roxie', author: 'Harvey', publisher: 'p6' },
  { id: 10, name: 'Roxie', author: 'Harvey', publisher: 'p10' },
  { id: 11, name: 'Roxie', author: 'Harvey', publisher: 'pp11' },
];

const fetcher = async (url: string) => {
  console.log("url = " + url)
  const res = await axios({
    method: 'GET',
    url,
    headers: { 
      'Content-Type' : 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }
  })
  console.log(res)
  return res.data
}

export default function CrudTable({ books }: any) {
  const { search } = useSearch();
  const { data, error } = useSWR(
    'http://localhost:3000/books/filtered',
    fetcher
  );

  if (error) return <div> An error has occurred while loading the data </div>;
  if (!data) return <div> Loading ... </div>;
  return (
    <div style={{ height: 631, width: '90%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
