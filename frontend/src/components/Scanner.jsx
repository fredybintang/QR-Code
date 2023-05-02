import React, { useEffect, useState } from "react";
import axios from "axios";
// import "../../App.scss";
import useSWR, { useSWRConfig } from "swr";
import { QrReader } from "react-qr-reader";
import { GetHour } from "./handler/DateConvert";

function DaftarTamu() {
  const [click, setClick] = useState(false);

  const fetch = async () => {
    const response = await axios.get("http://localhost:5000/guest");
    return response.data;
  };

  const { data } = useSWR("tamu", fetch, { refreshInterval: 100 });
  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="view-tamu">
      <div className="view-tamu-add">{click ? <AddTamu /> : null}</div>
      <div className="view-tamu-table">
        <table className="table">
          <thead className="table-head">
            <tr className="table-head-contain">
              <th>No</th>
              <th>Nama Tamu</th>
              <th>Nomor Telpon</th>
              <th>Status</th>
              <th>Jam Hadir</th>
            </tr>
          </thead>
          {data.map((tamu, index) => (
            <tbody className="table-body" key={index}>
              {tamu.status ? (
                <tr key={tamu.id} className="table-body-contain">
                  <td>{index + 1}</td>
                  <td>{tamu.name}</td>
                  <td>{tamu.no_telp}</td>
                  <td>
                    <p className={tamu.status ? "hadir" : "tidak-hadir"}>
                      {tamu.status ? "Hadir" : "Tidak Hadir"}
                    </p>
                  </td>
                  <td className="gap">
                    {GetHour(tamu.updateAt, "full")}
                  </td>
                </tr>
              ) : null}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

function ScanTamu() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState(false);

  const editTamu = async () => {
    // e.preventDefault();
    if (id !== "") {
      // console.log(id);
      setStatus(true);
      await axios.patch(`http://localhost:5000/guest/${id}`, {
        status: status,
      });
    } else {
      null;
    }
  };

  useEffect(() => {
    editTamu();
  }, [editTamu]);

  function getValue(result, error) {
    if (!!result) {
      setId(result?.text);
      console.log(result?.text);
    }
  }

  return (
    <div className="scan">
      <div className="scan-qr">
        <QrReader onResult={getValue} style={{ width: "100%" }} />
      </div>
      <div className="scan-daftar">
        <DaftarTamu />
      </div>
    </div>
  );
}

export default ScanTamu;
