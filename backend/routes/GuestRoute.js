import express from "express";
import {
    getGuest,
    getGuestbyId,
    createGuest,
    updateGuest,
    deleteGuest,
    // getImage,
} from "../controllers/GuestController.js";

const router = express.Router();

router.get('/guest', getGuest);
router.get('/guest/:id', getGuestbyId);
router.post('/guest', createGuest);
router.patch('/guest/:id', updateGuest);
router.delete('/guest/:id', deleteGuest);
// router.get('/images/:filename', getImage);

export default router;
