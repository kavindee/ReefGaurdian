import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Layout from "../components/Layout";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/history')  // Adjust this URL to where your Flask app is hosted
      .then(response => response.json())
      .then(data => setHistoryData(data))
      .catch(error => console.error('Error fetching history:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // If deletion is successful, update the historyData state by filtering out the deleted item
        setHistoryData(prevData => prevData.filter(item => item._id !== id));
        console.log(`Item with id ${id} deleted successfully.`);
      } else {
        console.error('Failed to delete item.');
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  };
  

  return (
    <Layout>
    <React.Fragment>
    <div>
      <Toolbar>
          <Typography variant="h5" noWrap component="div" sx={{ fontStyle:'bold', textAlign: 'center',flexGrow: 1 }}>
            Classification History
          </Typography>
        
        </Toolbar>
      {historyData.length > 0 ? (
        <TableContainer component={Paper} style={{ backgroundColor: '#d2edf7' }}>
          <Table aria-label="history table">
            <TableHead style={{ backgroundColor: '#4ebde6' }}>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Confidence</TableCell>
                <TableCell align="center">Timestamp</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <img src={`http://localhost:5000/image/${item._id}`} alt="Coral" style={{ width: '100px', height: '100px' }} />
                  </TableCell>
                  <TableCell align="center">{item.predicted_class}</TableCell>
                  <TableCell align="center">{item.confidence}%</TableCell>
                  <TableCell align="center">{new Date(item.timestamp).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="error" onClick={() => handleDelete(item._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No history data found.</p>
      )}
    </div>
    </React.Fragment>
    </Layout>
  );
};

export default HistoryPage;
