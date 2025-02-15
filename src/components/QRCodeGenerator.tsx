"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";

export default function QRCodeGenerator() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  // Generate UPI Payment Link
  const generateUPILink = () => {
    if (!upiId) return "";
    return `upi://pay?pa=${upiId}&pn=User&am=${amount}&cu=INR`;
  };

  // Download QR Code as Image
  const downloadQRCode = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "upi_qr.png";
    link.click();
  };

  // Share QR Code
  const shareQRCode = async () => {
    if (!qrRef.current) {
      alert("Sharing is not supported on this device.");
      return;
    }

    try {
      const canvas = await html2canvas(qrRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) return alert("Failed to generate QR image.");
        const file = new File([blob], "upi_qr.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "UPI Payment QR Code",
            text: `Scan this QR code to pay Rs. ${amount}`,
            files: [file],
          });
        } else {
          alert("Sharing images is not supported on this device.");
        }
      }, "image/png");
    } catch (error) {
      console.error("Error sharing QR Code:", error);
      alert("Error sharing QR Code. Try downloading it instead.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-purple-300 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          UPI QR Code Generator
        </h1>

        {/* UPI ID Input */}
        <input
          type="text"
          placeholder="Enter UPI ID (e.g. example@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-6"
        />

        {/* QR Code Display */}
        {upiId && (
          <div className="flex justify-center mb-6">
            <div ref={qrRef} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <QRCodeCanvas value={generateUPILink()} size={180} />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
            <button
            onClick={downloadQRCode}
            className="w-full bg-gradient-to-br from-purple-100 to-blue-300 hover:from-purple-400 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition duration-300 shadow-md"
            >
            📥 Download QR Code
            </button>

            <button
              onClick={shareQRCode}
              className="w-full bg-gradient-to-br from-green-100 to-green-300 hover:from-green-400 hover:to-green-800 text-white py-3 rounded-lg font-medium transition duration-300 shadow-md"
            >
              📤 Share QR Code
            </button>
        </div>
      </div>
    </div>
  );
}