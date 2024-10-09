import React from "react";

const GoBackFooter = ({ total, onNext, onBack, current }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="total-amount">Total: {total} LKR</div>
        <div className="button-group1">
          {current !== 1 && (
            <button onClick={onBack} className="footer-button">
              Go Back
            </button>
          )}
          <button onClick={onNext} className="footer-button">
            Next
          </button>
        </div>
      </div>
    </footer>
  );
};

export default GoBackFooter;
