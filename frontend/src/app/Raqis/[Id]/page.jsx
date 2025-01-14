'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Router } from 'next/navigation';

function Raqis (){
  const router = useRouter();
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { Id } = router.query;
  //     if (Id) {
  //       fetch(`/api/data/${Id}`)
  //         .then(response => response.json())
  //         .then(data => setData(data))
  //         .catch(error => console.error('Error fetching data:', error));
  //     }
  //   }
  // }, [router.isReady]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data for ID: {router.query.Id}</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};


export default Raqis;
