import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CustomCard from './CustomCard';
        
const Zone = ({ zoneName }) => {
    // const zonezName=useParams({zoneName})
    return (
    <CustomCard cardTitle={zoneName} cardText={""} 
    // image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFEdaaoj51TxbJZQkdGZHV6jrsjhVY8FrGhuQyevewxw&s"} 
    />

    );
};

export default Zone;
        