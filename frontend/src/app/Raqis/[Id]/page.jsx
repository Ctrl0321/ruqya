'use client'
import { useParams } from 'next/navigation';
import sampledata from '@/data/sampledata.json';

function Raqis (){
  const params = useParams();
  const Id = parseInt(params.Id, 10);
  const data = sampledata.find(item => item.id === Id);

  return (
    <div className='mb-56 text-black'>
      <h1>Data for ID: {Id}</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data found for this ID.</p>
      )}
    </div>
  );
};

export default Raqis;
