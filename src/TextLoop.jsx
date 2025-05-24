import React, { useState, useEffect } from "react";

const TextLoop = ({ children, interval = 3000 }) => {
  const items = React.Children.toArray(children);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return <>{items[index]}</>;
};

export default TextLoop;
