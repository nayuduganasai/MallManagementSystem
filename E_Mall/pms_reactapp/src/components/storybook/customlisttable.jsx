import React from 'react';
import { Table, Button } from 'react-bootstrap';

function CustomTable({ configuration, data, handleDelete, handleUpdate, addButtonText }) {
  
  return (
    <div className="min-vh-100" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>{configuration.title}</h2>
        <Button variant="secondary" onClick={configuration.onAddClick}>
          {addButtonText}
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {configuration.headers.map(header => (
              <th key={header}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item[configuration.keys[0]]}>
              {configuration.keys.map(key => (
                <td key={key}>{item[key]}</td>
              ))}
              <td>
                <Button variant="primary" onClick={() => handleUpdate(item)} >
                  Update
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(item[configuration.keys[0]])}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomTable;
