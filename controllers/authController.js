const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register Function
const register = async (req, res) => {
  const { empID, name, designation, password, email, mobile } = req.body;

  if (!empID || !name || !designation || !password || !email || !mobile) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.employee.create({
      data: {
        empID,
        name,
        designation,
        password: hashedPassword,
        email,
        mobile,
      },
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('empID')) {
      res.status(409).json({ message: 'Employee ID already exists' });
    } else {
      res.status(500).json({ message: 'Error registering user' });
    }
  }
};

// Login Function
const login = async (req, res) => {
  const { empID, password } = req.body;

  if (!empID || !password) {
    return res.status(400).json({ message: 'Please provide Employee ID and password' });
  }

  try {
    const user = await prisma.employee.findFirst({
      where: { empID },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, empID: user.empID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = { register, login };
