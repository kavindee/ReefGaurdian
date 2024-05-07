import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from "../components/Layout";


const HealthHistory = () => {
  const [healthHistory, setHealthHistory] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // Adjust this URL to where your Flask app is hosted
    fetch('http://127.0.0.1:5000/historyhealth')
      .then(response => response.json())
      .then(data => setHealthHistory(data))
      .catch(error => console.error('Error fetching history:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/deletehealth/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // If deletion is successful, update the healthHistory state by filtering out the deleted item
          setHealthHistory((prevData) => prevData.filter((item) => item._id !== id));
          console.log(`Item with id ${id} deleted successfully.`);
        } else {
          console.error('Failed to delete item.');
        }
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <Layout>
    <React.Fragment>
      <div style={{ padding: theme.spacing(3) }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            Coral Health History
          </Typography>
        </Toolbar>
        {healthHistory.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
            <Table aria-label="history table">
              <TableHead sx={{ backgroundColor: theme.palette.primary.dark }}>
                <TableRow>
                  <TableCell sx={{ color: theme.palette.common.white }}>Image</TableCell>
                  <TableCell sx={{ color: theme.palette.common.white }} align="center">Class</TableCell>
                  <TableCell sx={{ color: theme.palette.common.white }} align="center">Confidence</TableCell>
                  <TableCell sx={{ color: theme.palette.common.white }} align="center">Timestamp</TableCell>
                  <TableCell sx={{ color: theme.palette.common.white }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {healthHistory.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell component="th" scope="row">
                      <Avatar src={`http://127.0.0.1:5000/imagehealth/${item._id}`} alt="Coral" sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell align="center">{item.predicted_class}</TableCell>
                    <TableCell align="center">{item.confidence}%</TableCell>
                    <TableCell align="center">{new Date(item.timestamp).toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="subtitle1" sx={{ mt: 4, textAlign: 'center' }}>
            No history data found.
          </Typography>
        )}
      </div>
    </React.Fragment>
    </Layout>
  );
};

export default HealthHistory;
