import React, { useState } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { CSVReader } from 'react-papaparse';
import { CSVLink } from 'react-csv';

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleOnDrop = (data) => {
    const headers = data[0].meta.fields;
    const rows = data.map(row => row.data);
    setHeaders(headers);
    setData(rows);
  };

  const handleOnError = (err) => {
    console.error(err);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    setData([...data, newRow]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleInputChange = (e, rowIndex, header) => {
    const newData = data.map((row, i) => 
      i === rowIndex ? { ...row, [header]: e.target.value } : row
    );
    setData(newData);
  };

  return (
    <Box p={4}>
      <CSVReader onDrop={handleOnDrop} onError={handleOnError} addRemoveButton>
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      {data.length > 0 && (
        <>
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                {headers.map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {headers.map((header, index) => (
                    <Td key={index}>
                      <Input 
                        value={row[header]} 
                        onChange={(e) => handleInputChange(e, rowIndex, header)} 
                      />
                    </Td>
                  ))}
                  <Td>
                    <IconButton 
                      icon={<DeleteIcon />} 
                      onClick={() => handleRemoveRow(rowIndex)} 
                      aria-label="Remove row" 
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button leftIcon={<AddIcon />} onClick={handleAddRow} mt={4}>
            Add Row
          </Button>
          <Button as={CSVLink} data={data} headers={headers} filename={"edited_data.csv"} mt={4} ml={4}>
            Download CSV
          </Button>
        </>
      )}
    </Box>
  );
};

export default Index;