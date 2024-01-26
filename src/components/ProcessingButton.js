import React from 'react';
import LoadingCircle from './LoadingCircle';

export default function ProcessingButton({ loading, notification, text, onClick, button = false }) {

  const buttonStyle = {
    opacity: loading ? 0.5 : 1,
    ':hover': {
      opacity: 0.5,
    },
  };

  if (button) {
    return (
      <button
          onClick={onClick}
          disabled={loading}
          style={{buttonStyle}}
      >
        {loading ? notification : text || "Submit"}
      </button>
    )
  }

  else {
    return (
      <input
          className="processing-button"
            type="submit"
            value={loading ? notification : text || "Submit"}
            onClick={onClick}
            disabled={loading}
            style={{buttonStyle}}
          >
      </input>
    );
  }
};