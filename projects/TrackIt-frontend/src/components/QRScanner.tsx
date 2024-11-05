import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X } from 'lucide-react';

interface QRScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onResult, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    }, false);

    scanner.render(
      (decodedText) => {
        onResult(decodedText);
        scanner.clear();
        onClose();
      },
      (error) => {
        console.error('QR scan error:', error);
      }
    );

    setIsScanning(true);

    return () => {
      scanner.clear();
    };
  }, [onResult, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
        <div id="qr-reader" className="w-full" />
        {isScanning && (
          <p className="text-sm text-gray-600 mt-4 text-center">
            Position the QR code within the frame to scan
          </p>
        )}
      </div>
    </div>
  );
};

export default QRScanner;