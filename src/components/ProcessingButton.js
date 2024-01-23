import React from 'react';

export default function ProcessingButton({ loading, notification, text, onClick }) {
  return (
    <input
      type="submit"
      value={loading ? notification : text || "Submit"}
      style={{ opacity: loading ? "30%" : "100%" }}
      onClick={onClick}
    />
  );
};