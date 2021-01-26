import React from 'react';

function Message({ content, type }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {content}
    </div>
  );
}

export default Message;
