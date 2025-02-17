"use client";
import {useRouter, useSearchParams} from "next/navigation";
import DefultButton from "@/components/ui/buttons/DefaultButton";
import {useEffect} from "react";
import {deleteSession, updateAvailability, verifySession} from "@/lib/api";
import {sendMeetingEmail} from "@/lib/EmailService";

const FailedPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const  deletingSession = async () => {
      const rakiId = searchParams.get('rakiId');
      const date = searchParams.get('date');
      if (rakiId && date) {
        try {
          await deleteSession(rakiId,date)
        } catch (error) {
          console.error('Error deleting session:', error);
        }
      }
    };

    deletingSession();
  }, [searchParams]);
  return (
    <div className="min-h-80vh flex items-center justify-center my-10">
      <div className="text-center max-w-md px-4 py-8 bg-white rounded-2xl shadow-lg drop-shadow-md mx-4">
        <div className="x-circle">
          <div className="x-mark">
            <div className="x-line-1"></div>
            <div className="x-line-2"></div>
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Booking Failed</h2>
        <div className="mt-4 space-y-3 text-left">
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
          <div className="flex items-center justify-center w-full">
            <DefultButton bg={true} className="rounded-lg" onClick={() => router.push("/")}>
              Go to Home
            </DefultButton>
          </div>
        </div>
      </div>
      <style jsx>{`
        .x-circle {
          width: 120px;
          height: 120px;
          position: relative;
          margin: 0 auto;
          border-radius: 50%;
          border: 3px solid #ff5252;
          animation: circle-fill 0.4s ease-in;
          background: #ff5252;
          box-shadow: 0 0 20px rgba(255, 82, 82, 0.2);
        }
        .x-mark {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .x-line-1,
        .x-line-2 {
          position: absolute;
          width: 6px;
          height: 70px;
          background-color: white;
          top: 25px;
          left: 56.5px;
          border-radius: 3px;
          transform-origin: center;
        }
        .x-line-1 {
          transform: rotate(45deg);
          animation: draw-x 0.4s ease-in;
        }
        .x-line-2 {
          transform: rotate(-45deg);
          animation: draw-x 0.4s ease-in;
        }
        @keyframes circle-fill {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes draw-x {
          0% {
            transform: scale(0) rotate(45deg);
          }
          100% {
            transform: scale(1) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FailedPage;
