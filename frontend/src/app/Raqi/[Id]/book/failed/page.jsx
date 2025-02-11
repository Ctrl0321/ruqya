"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FailedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
      <div className="text-center max-w-md px-4 py-8 bg-white rounded-2xl shadow-lg mx-4">
        <div className="x-circle">
          <div className="x-mark">
            <div className="x-line-1"></div>
            <div className="x-line-2"></div>
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Booking Failed</h2>
        <div className="mt-4 space-y-3">
          <p className="text-gray-700">We couldn't process your booking at this time.</p>
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h3 className="font-medium text-red-800">Possible reasons:</h3>
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              <li>Selected time slot might no longer be available</li>
              <li>Network connection issues</li>
              <li>Server temporarily unavailable</li>
            </ul>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800">What you can do:</h3>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              <li>Try booking again in a few minutes</li>
              <li>Select a different time slot</li>
              <li>Check your internet connection</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
          <p className="mt-4 text-gray-500 text-sm">Redirecting to home page...</p>
        </div>
      </div>
      <style jsx>{`
        .x-circle {
          width: 120px;
          height: 120px;
          position: relative;
          margin: 0 auto;
          border-radius: 50%;
          border: 3px solid #FF5252;
          animation: circle-fill 0.4s ease-in;
        //   background: #FF5252;
          box-shadow: 0 0 20px rgba(255, 82, 82, 0.2);
        }
        .x-mark {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .x-line-1, .x-line-2 {
          position: absolute;
          width: 6px;
          height: 70px;
          background-color: white;
          top: 25px;
          left: 57px;
          border-radius: 3px;
        }
        @keyframes circle-fill {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes draw-x {
          0% { transform: scale(0) rotate(45deg); }
          100% { transform: scale(1) rotate(45deg); }
        }
        .x-line-2 {
          animation-name: draw-x-2;
        }
        @keyframes draw-x-2 {
          0% { transform: scale(0) rotate(-45deg); }
          100% { transform: scale(1) rotate(-45deg); }
        }
      `}</style>
    </div>
  );
};

export default FailedPage;
