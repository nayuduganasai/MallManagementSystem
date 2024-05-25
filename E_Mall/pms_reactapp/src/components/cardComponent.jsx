import React from 'react';

const CardComponent = ({ option }) => {
  // Render different content based on the selected option
  const renderCardContent = () => {
    switch (option) {
      case 'Dashboard':
        return <div>Dashboard Content Goes Here</div>;
      case 'Reports':
        return <div>Reports Content Goes Here</div>;
      case 'Users':
        return <div>Users Content Goes Here</div>;
      case 'Logout':
        return <div>Logout Content Goes Here</div>;
      case 'Categories':
        return <div>Categories Content Goes Here</div>;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div>
      {/* Display the content based on the selected option */}
      {renderCardContent()}
    </div>
  );
};

export default CardComponent;
