import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Hello() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customer/test');
        setResponseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{responseData ? responseData : 'Loading...'}</h1>
    </div>
  );
}

export default Hello;
