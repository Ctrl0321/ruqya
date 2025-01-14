'use client'
import { useParams } from 'next/navigation';

function Raqis (){
  const params = useParams();
  const Id = params.Id;

  return (
    <div className='mb-56 text-black'>
      <h1>Data for ID: {Id}</h1>
    </div>
  );
};

export default Raqis;
