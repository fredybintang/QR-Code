import React from 'react';
import QRCode from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../App.scss";
import pria1 from '../assets/images/couple-pria.png';
import wanita1 from '../assets/images/couple-wanita.png';

const QRCodeGenerator = () => {
  const { id } = useParams();
  const [guest, setGuest] = useState(null);
  const [qrCodeImage, setQRCodeImage] = useState(null);

  const fetchGuest = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/guest/${id}`);
      setGuest(response.data);
      
      const qrCodeNode = document.getElementById(`qrcode-${response.data.id}`);
      const dataUrl = await htmlToImage.toPng(qrCodeNode);
      setQRCodeImage(dataUrl);
      
      await saveQRCode(response.data.id, dataUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const saveQRCode = async (id) => {
    const qrCodeNode = document.getElementById(`qrcode-${id}`);
  
    // Cek apakah elemen QR Code sudah tersedia di dalam dokumen
    if (qrCodeNode && qrCodeNode.ownerDocument) {
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
    } else {
      console.log('QR code element is not available in the document yet.');
    }
  };
  

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
    fetchGuest();
  }, [id]);

  if (!guest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
      <div className="wrap">
        <div className="modal">
          <div className="container">
            <div className="row">
              <h3>Undangan Pernikahan</h3>
              <div className="couple-name">
                <h1>Anggun</h1>
                <h2>2  6  .  1  0  .  2  0  2  1</h2>
                <h1>Aditama</h1>
              </div>
              <div className="footer">
                <h4>Kepada Yth.</h4>
                <h4>Bapak/Ibu/Saudara/Saudari</h4>
                <h4>{guest.name}</h4>
              </div>
              <button>Buka undangan</button>
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="bg-linear"></div>
          <div className="container">
            <div className="row">
              <div className="hero-content">
                <div className="title">Undangan Pernikahan</div>
                <div className="couple-name">
                  <h1>Anggun</h1>
                  <h4>2  6  .  1  0  .  2  0  2  1</h4>
                  <h1>Aditama</h1>
                </div>
                <div className="btnLive">
                  <button>Live Instagram</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="couple">
          <div className="container">
            <div className="row">
              <div className="title">Mempelai</div>
              <div className="couple-pria">
                <img src={pria1} alt="" />
                <div className="name">
                  <h2>Yoga Aditama</h2>
                  <h4>Putra dari</h4>
                  <h4>Bapak Hamka Hamzah, S.Pd</h4>
                  <h4>& Ibu Paramitha Julaiha, S.Pd</h4>
                </div>
              </div>
              <div className="couple-wanita">
                <img src={wanita1} alt="" />
                <div className="name">
                  <h2>Anggun Dwiutami</h2>
                  <h4>Putri dari</h4>
                  <h4>Bapak Hamka Hamzah, S.Pd</h4>
                  <h4>& Ibu Paramitha Julaiha, S.Pd</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="video">
          <div className="container">
            <div className="row">
              <iframe src="" frameBorder="0"></iframe>
              <div className="qrcode">
                <h1>Kehadiran</h1>
                <h4>(scan QR Code ini untuk absen kehadiran)</h4>
                <button onClick={() => handleDownloadQRCode(guest.qrcode)} className='qrcode-content' id={`qrcode-${guest.id}`}>
                  <QRCode value={guest.id} />
                </button>
                <h4>(click QR Code untuk mendownload)</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
