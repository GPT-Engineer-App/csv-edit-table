import React, { useState } from 'react';
import { Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setHeaders(result.meta.fields);
        setData(result.data);
      },
    });
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    setData([...data, newRow]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleInputChange = (index, header, value) => {
    const newData = [...data];
    newData[index][header] = value;
    setData(newData);
  };

  return (
    <Box p={4}>
      <Input type="file" accept=".csv" onChange={handleFileUpload} mb={4} />
      {data.length > 0 && (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                {headers.map((header) => (
                  <Th key={header}>{header}</Th>
                ))}
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {headers.map((header) => (
                    <Td key={header}>
                      <Input
                        value={row[header]}
                        onChange={(e) => handleInputChange(rowIndex, header, e.target.value)}
                      />
                    </Td>
                  ))}
                  <Td>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => handleRemoveRow(rowIndex)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddRow} mt={4}>
            Add Row
          </Button>
          <CSVLink data={data} headers={headers} filename="edited_data.csv">
            <Button colorScheme="blue" mt={4} ml={4}>
              Download CSV
            </Button>
          </CSVLink>
        </>
      )}
    </Box>
  );
};

export default Index;