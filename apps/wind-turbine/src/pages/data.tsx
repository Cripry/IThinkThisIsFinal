import React, { useEffect, useState, useRef } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';

interface ITableData {
  record_time: string;
  wind_speed: number;
  rotor_speed: number;
  active_power_awg: number;
  nacelle_position: number;
  feature_1: number;
  feature_3: number;
  feature_7: number;
  feature_28: number;
  day_sin: number;
  day_cos: number;
  year_sin: number;
  year_cos: number;
  hour_sin: number;
  hours_cos: number;
  minute_sin: number;
  minute_cos: number;
}

const getData = async (): Promise<ITableData[]> => {
  const res = await fetch("http://localhost:3000/api/data", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
}

const About: React.FC = (props) => {
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles && newFiles.length > 0) {
      setFiles([newFiles[0]]);
      uploadFile(newFiles[0]);
    } else {
      setFiles([]);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('File uploaded successfully.');
        setFiles([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <Container>
        <h1>Wind Turbine Data</h1>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <h2>Upload Data File</h2>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFilesChange}
          />
        </Paper>
        <h5>Last 10 Entries</h5>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Record Time</TableCell>
              <TableCell>Wind Speed</TableCell>
              <TableCell>Rotor Speed</TableCell>
              <TableCell>Active Power</TableCell>
              <TableCell>Nacelle Position</TableCell>
              <TableCell>Day Sin</TableCell>
              <TableCell>Day Cos</TableCell>
              <TableCell>Year Sin</TableCell>
              <TableCell>Year Cos</TableCell>
              <TableCell>Hour Sin</TableCell>
              <TableCell>Hour Cos</TableCell>
              <TableCell>Minute Sin</TableCell>
              <TableCell>Minute Cos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{format(new Date(item.record_time), 'dd-MM-yyyy HH:mm')}</TableCell>
                <TableCell>{item.wind_speed}</TableCell>
                <TableCell>{item.rotor_speed}</TableCell>
                <TableCell>{item.active_power_awg}</TableCell>
                <TableCell>{item.nacelle_position}</TableCell>
                <TableCell>{item.day_sin}</TableCell>
                <TableCell>{item.day_cos}</TableCell>
                <TableCell>{item.year_sin}</TableCell>
                <TableCell>{item.year_cos}</TableCell>
                <TableCell>{item.hour_sin}</TableCell>
                <TableCell>{item.hours_cos}</TableCell>
                <TableCell>{item.minute_sin}</TableCell>
                <TableCell>{item.minute_cos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default About;
