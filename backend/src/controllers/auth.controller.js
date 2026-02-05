import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      email,
      password: hashedPassword,
      name,
    })

    await user.save()

    const token = generateToken(user)
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = generateToken(user)
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
