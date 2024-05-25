import React from "react";
import { Table, Button } from "react-bootstrap";

const DiscountList = ({ discounts, handleDelete, handleUpdate }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Discount Code</th>
          <th>Discount Percentage</th>
          <th>Discount StartDate</th>
          <th>Discount End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={index}>
            <td>{discount.id}</td>
            <td>{discount.discountName}</td>
            <td>{discount.percentage}%</td>
            <td>{discount.startDate}</td>
            <td>{discount.endDate}</td>
            <td>
              <Button variant="primary" onClick={() => handleUpdate(discount)}>
                Update
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => handleDelete(discount.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DiscountList;
