import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth } from 'date-fns';

const CustomDatePicker = ({ availableDate, onStartDateChange, onEndDateChange }) => {
  // console.log(availableDate);
  const range = (start, end, step = 1) => {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len).fill().map((_, idx) => start + idx * step);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(new Date(availableDate ? availableDate : null));
const [endDate, setEndDate] = useState(new Date(availableDate ? availableDate : null));

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onStartDateChange(formatDate(startDate)); // Format and call the parent callback
    // setStartDate(date);
    // if (date.getTime() === endDate.getTime()) {
    //   alert("Please select different end date");
    //   // Resetting the end date to avoid the same date selection
    //   setEndDate(new Date(date.getTime() + 86400000)); // Adding 1 day to the selected start date
    // }
    // onStartDateChange(formatDate(date));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onEndDateChange(formatDate(endDate)); // Format and call the parent callback
    // setEndDate(date);
    // if (date.getTime() === startDate.getTime()) {
    //   alert("Please select different start date");
    //   // Resetting the start date to avoid the same date selection
    //   setStartDate(new Date(date.getTime() - 86400000)); // Subtracting 1 day from the selected end date
    // }
    // onEndDateChange(formatDate(date));
  };

  return (
    <div>
      <label>Start Date:</label>
      <DatePicker
        selected={startDate}
        selectsStart
        onChange={handleStartDateChange}
        minDate={new Date(availableDate)}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        showMonthDropdown
      />

      <label>End Date:</label>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsStart
        minDate={new Date(availableDate)}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        showMonthDropdown
      />
    </div>
  );
};

export default CustomDatePicker;
