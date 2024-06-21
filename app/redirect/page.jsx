import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoadingPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/paypal-webhook');
        const data = await response.json();

        if (data.status === 'completed') {
          router.push('/success');
        } else {
          setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkStatus();
  }, [router]);

  return (
    <div>
      {isProcessing ? (
        <div>Loading, please wait...</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
}
