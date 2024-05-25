// SpacesList.jsx
import React, { useState, useEffect } from 'react';
import { Card, Row, Col,Form, Button  } from 'react-bootstrap'; 
import SpaceCardAdmin from './spacecardadmin';
import SpaceService from './services/spaceservice';

const SpacesList = () => {
  const [spaces, setSpaces] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    rentType: '',
    term: '',
  });

  useEffect(() => {
    // Fetch spaces from API based on filters
    // axios.get('http://localhost:8080/emall/spaces')
    //   .then((response) => {
    //     setSpaces(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    async function fetchSpaces(){
      await SpaceService.getAllSpaces().then((res)=>setSpaces(res))
                                          .catch((error) => {
                                              console.log(error);
                                            });
    }
    fetchSpaces();
  }, [filters]);

  // ...other code

  return (


<div>
{/* Other components */}
<Row xs={1} md={1} lg={1}> {/* Set the number of columns based on screen size */}
  {spaces.map((space) => (
    <Col key={space.id} className="mb-4">
          {/* <SpaceCardUser key={space.id} spaceDetails={space} /> */}
          <SpaceCardAdmin key={space.id} spaceDetails={space}/>
    </Col>
  ))}
</Row>
</div>
  );
};

export default SpacesList;
