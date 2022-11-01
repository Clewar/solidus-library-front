import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueSetterParams, GridSelectionModel, GridRowId } from '@mui/x-data-grid';
import { useSearch } from "../context/searchContext";
import axios from 'axios'
import { Box, Button, TextField } from '@mui/material';

function setName(params: GridValueSetterParams) {
  async function updateBook (id: number, data: Object) {
    await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/books/' + id,
      headers: { 
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data
    })
  }
  const name = params.value;
  updateBook(params.row.id, {name})
  return { ...params.row, name };
}

function setAuthor(params: GridValueSetterParams) {
  async function updateBook (id: number, data: Object) {
    await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/books/' + id,
      headers: { 
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data
    })
  }
  const author = params.value;
  updateBook(params.row.id, {author})
  return { ...params.row, author };
}

function setPublisher(params: GridValueSetterParams) {
  async function updateBook (id: number, data: Object) {
    await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/books/' + id,
      headers: { 
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data
    })
  }
  const publisher = params.value;
  updateBook(params.row.id, {publisher})
  return { ...params.row, publisher };
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 80, flex: 1 },
  { field: 'name', headerName: 'Book Name', minWidth: 300, flex: 3, editable: true, valueSetter: setName},
  { field: 'author', headerName: 'Author', minWidth: 200, flex: 3, editable: true, valueSetter: setAuthor},
  { field: 'publisher',headerName: 'Publisher', minWidth: 150, flex: 2, editable: true, valueSetter: setPublisher }
];

export default function CrudTable({ performSearch }: any) {
  const [books, setBooks] = useState<any>([]);
  const [newBookName, setNewBookName] = useState('');
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBookName(event.target.value);
  };
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBookAuthor(event.target.value);
  };
  const [newBookPublisher, setNewBookPublisher] = useState('');
  const handleChangePublisher = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBookPublisher(event.target.value);
  };
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const { search } = useSearch();

  async function deleteBook () {
    const res = await axios({
      method: 'DELETE',
      url: 'http://localhost:3000/books/' + selectionModel[0],
      headers: { 
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    })
    if (res.status === 200) {
      setBooks(books.filter((book: { id: GridRowId; }) => {
        return book.id !== selectionModel[0]
      }))
    }
  }

  async function createBook (data: Object) {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/books/',
      headers: { 
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      data,
    })
    if (res.status === 201) {
      setBooks(books.concat([res.data]))
      setNewBookName('')
      setNewBookAuthor('')
      setNewBookPublisher('')
    }
  }

  useEffect(() => {
    async function fetchFiltered() {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:3000/books/filtered',
        headers: { 
          'Content-Type' : 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        params: {
          searchQuery: search,
        }
      })
      setBooks(res.data)
    }
    fetchFiltered().catch(console.error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performSearch]);

  if (search === '' && books.length === 0) return <div> Loading ... </div>;

  return (
    <div style={{ height: 527, width: '90%' }}>
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        rows={books}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField label='Name' variant='outlined' required value={newBookName} onChange={handleChangeName}/>
        <TextField label='Author' variant='outlined' value={newBookAuthor} onChange={handleChangeAuthor}/>
        <TextField label='Publisher' variant='outlined' value={newBookPublisher} onChange={handleChangePublisher}/>
        <Button variant='contained' sx={{backgroundColor: 'green'}} onClick={() => {createBook({name: newBookName, author: newBookAuthor, publisher: newBookPublisher})}}>Add New Book</Button>
      </Box>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5px'}}>
        <Button variant='contained' sx={{backgroundColor: 'red', height: '56px'}} onClick={() => { if (selectionModel.length > 0) {deleteBook()}}}>Delete Selected Book</Button>
      </div>
    </div>
  );
}
