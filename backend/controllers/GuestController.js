import { PrismaClient } from "@prisma/client";
import path from 'path';
import fs from "fs";

const prisma = new PrismaClient();

export const getGuest = async (req, res) => {
    try {
        const response = await prisma.guest.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getGuestbyId = async (req, res) => {
    try {
        const response = await prisma.guest.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const createGuest = async (req, res) => {
    const { name, no_telp, alamat, qrcode, status } = req.body;
    try {
        const guest = await prisma.guest.create({
            data: {
                name: name,
                no_telp: no_telp,
                alamat: alamat,
                qrcode: qrcode,
                status: status
            }
        });
        res.status(201).json(guest);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// export const createGuest = async (req, res) => {
//     const { name, no_telp, alamat, status } = req.body;
//     try {
//         const qrcode = '/images/' + req.file.filename;
//         const guest = await prisma.guest.create({
//             data: {
//                 name: name,
//                 no_telp: no_telp,
//                 alamat: alamat,
//                 qrcode: qrcode,
//                 status: status
//             }
//         });
//         res.status(201).json(guest);
//     } catch (error) {
//         res.status(400).json({ msg: error.message });
//     }
// }

export const updateGuest = async (req, res) => {
    const { name, no_telp, alamat, qrcode, status } = req.body;
    try {
        // const qrc = '/images/' + req.file.filename;
        const guest = await prisma.guest.update({
            where: {
                id: req.params.id
            },
            data: {
                name: name,
                no_telp: no_telp,
                alamat: alamat,
                qrcode: qrcode,
                status: status
            }
        });
        res.status(200).json(guest);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteGuest = async (req, res) => {
    try {
        const guest = await prisma.guest.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(guest);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// export const getImage = async (req, res) => {
//     const imagePath = path.join(__dirname, 'public', 'images', req.params.filename);
//     try {
//         const response = await prisma.guest.findUnique({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.sendFile(imagePath);
//     } catch (error) {
//         console.error(error);
//         res.status(404).send('Image not found');
//     }
// };

