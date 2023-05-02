import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
// import { BsPlus, BsQrCodeScan } from "react-icons/bs";

function AddTamu() {
  const [name, setName] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [qrcode, setQrcode] = useState("");

  const addTamu = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/guest", {
      name: name,
      no_telp: parseInt(telp),
      alamat: alamat,
      qrcode: qrcode,
    });
    form.reset();
  };

  return (
    <>
      <form id="form" onSubmit={addTamu} className="form">
        <div className="form-value">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
        </div>
        <div className="form-value">
          <label>Nomor Telpon</label>
          <input
            value={telp}
            onChange={(e) => {
              setTelp(e.target.value);
            }}
            required
          ></input>
        </div>
        <div className="form-value">
          <label>Alamat</label>
          <input
            value={alamat}
            onChange={(e) => {
              setAlamat(e.target.value);
            }}
            required
          ></input>
        </div>
        <div className="form-value">
          <label>QR Code</label>
          <input
            value={qrcode}
            onChange={(e) => {
              setQrcode(e.target.value);
            }}
            required
          ></input>
        </div>
        <input type="submit" className="submit"></input>
      </form>
    </>
  );
}

function TamuList() {
  const { mutate } = useSWRConfig();

  const [click, setClick] = useState(false);

  const active = () => setClick(!click);

  const fetch = async () => {
    const response = await axios.get("http://localhost:5000/guest");
    return response.data;
  };

  const { data } = useSWR("tamu", fetch, { refreshInterval: 100 });
  if (!data) return <h2>Loading...</h2>;

  const deleteTamu = async (tamuId) => {
    await axios.delete(`http://localhost:5000/guest/${tamuId}`);
    mutate("tamu");
  };

  return (
    <div className="view-tamu">
      <div className="view-tamu-menu">
        <button onClick={active} className="add">
          {/* <BsPlus /> */}
        </button>
        <Link to="/scan" className="scan">
          {/* <BsQrCodeScan /> */}
        </Link>
      </div>
      <div className="view-tamu-add">{click ? <AddTamu /> : null}</div>
      <div className="view-tamu-table">
        <table className="table">
          <thead className="table-head">
            <tr className="table-head-contain">
              <th>No</th>
              <th>Nama Tamu</th>
              <th>Nomor Telpon</th>
              <th>Alamat</th>
              <th>Undangan</th>
              <th>Status</th>
              <th>Jam Hadir</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data.map((tamu, index) => (
              <tr key={tamu.id} className="table-body-contain">
                <td>{index + 1}</td>
                <td>{tamu.name}</td>
                <td>{tamu.no_telp}</td>
                <td>{tamu.alamat}</td>
                <td>{tamu.qrcode}</td>
                <td>
                  <p className={tamu.status ? "hadir" : "tidak-hadir"}>
                    {tamu.status ? "Hadir" : "Tidak Hadir"}
                  </p>
                </td>
                <td className="gap">{tamu.j_hadir}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteTamu(tamu.id);
                    }}
                    className="delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TamuList;
