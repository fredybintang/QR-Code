import QRCode from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import axios from 'axios';
import { useState, useEffect } from 'react';

const QRCodeGenerator = ({ id }) => {
  const [guests, setGuests] = useState([]);
  const [qrCodeImage, setQRCodeImage] = useState(null);

  const fetchGuests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/guest');
      setGuests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

   // saveQRCode Mengubah database kolom qrcode
  const saveQRCode = async (id) => {
    const qrCodeNode = document.getElementById(`qrcode-${id}`);

    // Convert QR code to image
    const dataUrl = await htmlToImage.toPng(qrCodeNode);
    setQRCodeImage(dataUrl);
    const formData = new FormData();
    formData.append('qrcode', dataUrl);

    // Save image to database
    try {
      await axios.patch(`http://localhost:5000/guest/${id}`, { qrcode: dataUrl });
      console.log('QR code saved to database!');
    } catch (error) {
      console.log(error);
    }
  };

  // // saveQRCode Tidak mengubah database kolom qrcode
  // const saveQRCode = async (id) => {
  //   const qrCodeNode = document.getElementById(`qrcode-${id}`).childNodes[0];

  //   // Convert QR code to image
  //   const imageDataUrl = await htmlToImage.toPng(qrCodeNode);
  //   setQRCodeImage(imageDataUrl);
  //   const formData = new FormData();
  //   formData.append('qrcode', imageDataUrl);

  //   // Save image to database
  //   try {
  //       const response = await axios.patch(`http://localhost:5000/guest/${id}`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };

  const handleDownloadQRCode = (qrcode) => {
    if (qrCodeImage) {
        const downloadLink = document.createElement('a');
        downloadLink.href = qrCodeImage;
        downloadLink.download = `${qrcode}.png`;
        downloadLink.click();
        downloadLink.remove();
      } else {
        console.log('QR code image belum tersedia, silakan klik tombol "Save QR Code" terlebih dahulu.');
    };
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div>
      {guests.map((guest) => (
        <div key={guest.id}>
          <p>ID Tamu: {guest.id}</p>
          <p>Nama Tamu: {guest.name}</p>
          <div id={`qrcode-${guest.id}`}>
            <QRCode value={guest.id} />
          </div>
          <p>Hasil QR Code: {guest.qrcode}</p>
          <button onClick={() => saveQRCode(guest.id)}>Save QR Code</button>
          {qrCodeImage && <button onClick={() => handleDownloadQRCode(guest.qrcode)}>Download QR Code</button>}
        </div>
      )
      )}
    </div>
  );
};

export default QRCodeGenerator;