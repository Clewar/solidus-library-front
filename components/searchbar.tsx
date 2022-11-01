import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from "../context/searchContext";

function SearchBar({handleSearch}: any) {

  const { search, setSearchTerm } = useSearch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }}
      elevation={4}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 300, width:'40%', maxWidth: 550, marginBottom: '10px' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Books, Authors or Publishers"
        inputProps={{ 'aria-label': 'search books' }}
        value={search}
        onChange={handleChange}
        />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;