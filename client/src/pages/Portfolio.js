import React, { useEffect, useState } from 'react';
export default function Portfolio() {
  const [data, setData] = useState({});
  const email = localStorage.getItem('email');
  useEffect(() => {
    fetch(`http://localhost:5000/api/portfolio/${email}`)
      .then(res => res.json())
      .then(setData);
  }, [email]);
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.about}</p>
      <p><strong>Skills:</strong> {data.skills}</p>
      <p><strong>Contact:</strong> {data.contact}</p>
    </div>
  );
}
