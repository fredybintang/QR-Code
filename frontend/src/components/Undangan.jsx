import React from "react";
import QRCodeGenerator from "./generator";
import "../App.scss";
import pria1 from '../assets/images/couple-pria.png';
import wanita1 from '../assets/images/couple-wanita.png';

const Undangan = () => {
    return (
        <body>
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
                                <h4>Nama</h4>
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
                            <iframe src="" frameborder="0"></iframe>
                            <div className="qrcode">
                                <h1>Kehadiran</h1>
                                <h4>(scan QR Code ini untuk absen kehadiran)</h4>
                                <div id={`qrcode-${guest.id}`}>
                                    <QRCode value={guest.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Undangan;