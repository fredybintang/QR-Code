import React, { useState } from 'react';
import QRCodeScanner from './components/Scanner';
import { postAbsensi } from './api';

function IndexPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postAbsensi({
        ...formData,
        waktu: new Date().toISOString(),
      });
      alert('Data absensi berhasil dikirim');
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengirimkan data absensi');
    }
  };

  return (
    <div>
      <h1>Absensi Scan QR Realtime</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <QRCodeScanner onScan={(data) => console.log(data)} />
        </div>
        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nama">Nama:</label>
              <input type="text" id="nama" name="nama" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleChange} />
            </div>
            <button type="submit">Kirim</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
