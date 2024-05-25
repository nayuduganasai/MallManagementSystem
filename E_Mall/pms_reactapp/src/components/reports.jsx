import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Reports = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [bookingsData, setBookingsData] = useState({
    monthly: [10, 20, 30, 25, 15, 18, 22, 27, 35,5, 28, 20],
    yearly: 280,
  });

  useEffect(() => {
    // Bar Chart
    if (barChartRef.current !== null) {
      barChartRef.current.destroy();
    }

    const barCtx = document.getElementById('barGraph').getContext('2d');
    const newBarChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Spaces Booked per Month',
            data: bookingsData.monthly,
            backgroundColor: '#00A4B4',
            borderColor: 'gray',
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Booked Spaces',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
        },
      },
    });

    barChartRef.current = newBarChart;

    // Pie Chart
    const totalSpaces = bookingsData.yearly;
    const unbookedSpaces = 100 - totalSpaces;

    if (pieChartRef.current !== null) {
      pieChartRef.current.destroy();
    }

    const pieCtx = document.getElementById('pieGraph').getContext('2d');
    const newPieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Booked Spaces', 'Unbooked Spaces'],
        datasets: [
          {
            label: 'Spaces Status',
            data: [totalSpaces, unbookedSpaces],
            backgroundColor: ['#C66E4E', '#177A67'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    pieChartRef.current = newPieChart;
  }, [bookingsData]);

  return (
    <div>
      <div className="d-flex">
        <canvas id='barGraph' className='w-50 h-25 m-2 me-5 '></canvas>
        <canvas id='pieGraph' className='w-25 h-50 m-2 ms-5 '></canvas>
      </div>
      <p style={{fontWeight:'bold'}}>Total Spaces Booked in the Year: {bookingsData.yearly}</p>
    </div>
  );
};

export default Reports;
