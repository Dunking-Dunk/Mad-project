import express from "express";

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    res.cookie('token', '', {}).json('logged out')
})

export {router as signoutRouter}