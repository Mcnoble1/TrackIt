import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ProductQRCodeProps {
  productId: string;
  size?: number;
}

const ProductQRCode: React.FC<ProductQRCodeProps> = ({ productId, size = 128 }) => {
  const verificationUrl = `${window.location.origin}/verify?id=${productId}`;

  return (
    <div className="flex flex-col items-center space-y-2">
      <QRCodeSVG
        value={verificationUrl}
        size={size}
        level="H"
        includeMargin={true}
      />
      <p className="text-sm text-gray-600">Scan to verify product</p>
    </div>
  );
};

export default ProductQRCode;