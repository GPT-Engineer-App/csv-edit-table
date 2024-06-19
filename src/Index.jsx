import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react';
import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileLoad = (data) => {
    if (data.length > 0) {
      setHeaders(data[0]);
      setData(data.slice(1));
    }
  };

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const newData = [...data];
    newData[rowIndex][columnIndex] = value;
    setData(newData);
  };

  const addRow = () => {
    const newRow = headers.map(() => '');
    setData([...data, newRow]);
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <Box p={4}>
      <CSVReader onFileLoaded={handleFileLoad} />
      {data.length > 0 && (
        <Box mt={4}>
          <Table variant="simple">
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
                  {row.map((cell, columnIndex) => (
                    <Td key={columnIndex}>
                      <Input
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                      />
                    </Td>
                  ))}
                  <Td>
                    <Button colorScheme="red" onClick={() => removeRow(rowIndex)}>
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt={4} colorScheme="teal" onClick={addRow}>
            Add Row
          </Button>
          <Button mt={4} ml={4} colorScheme="blue">
            <CSVLink data={[headers, ...data]} filename={"edited_data.csv"}>
              Download CSV
            </CSVLink>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;