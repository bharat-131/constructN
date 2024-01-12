import React, { useState, useEffect } from 'react';

interface WarningNotificationProps {
  message: string;
}

const WarningNotification: React.FC<WarningNotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isVisible ? (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', background: 'red', padding: '10px', borderRadius: '4px' }}>
      {message}
    </div>
  ) : null;
};

export default WarningNotification;