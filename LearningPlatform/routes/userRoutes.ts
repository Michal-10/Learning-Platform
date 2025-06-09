// import express from 'express';
// import User from '../models/User';

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   try {
//     const { email, phone, name } = req.body;
//     if (!email || !phone || !name) 
//       return res.status(400).json({ error: 'Name and phone required' });
//     const user = new User({ email, phone, name });
//     await user.save();
//     res.status(201).json(user);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const {email, phone } = req.body;
//     if (!phone || !email) 
//       return res.status(400).json({ error: 'Phone required' });

//     const user = await User.findOne({ email, phone });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     res.status(200).json(user);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;


import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers
} from '../controllers/userController';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/', getUsers);

export default router;
