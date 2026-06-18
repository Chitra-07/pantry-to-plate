import React from 'react';
import { Navigate } from 'react-router-dom';

function RecipeFinder() {
  // Redirect to home page since recipe finder is integrated there
  return <Navigate to="/" replace />;
}

export default RecipeFinder;