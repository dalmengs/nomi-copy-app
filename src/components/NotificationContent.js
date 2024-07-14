import React from 'react';

function NotificationContent({ content, isOdd }) {
  return (
    <div className={`p-4 mb-2 rounded-lg ${!isOdd ? 'bg-purple-200' : 'bg-purple-300'}`}>
      {content}
    </div>
  );
}

export default NotificationContent;
