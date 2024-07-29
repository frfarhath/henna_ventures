import React from 'react';
import '../style/loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p style={{margin:0, fontWeight:'bold', marginTop: '0.5rem'}}>Loading...</p>
    </div>
  );
};

export default Loading;
