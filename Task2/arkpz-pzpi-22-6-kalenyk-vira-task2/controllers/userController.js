const userRepository = require('../repositories/userRepository');

const getAllUsers = async (req, res) => {
  const users = await userRepository.getUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userRepository.getUserById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
};

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await userRepository.addUser(name, email, password, role);
  res.status(201).json({ userId: result.insertId });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const result = await userRepository.updateUser(id, name, email, password, role);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ message: 'User updated successfully' });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await userRepository.deleteUser(id);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ message: 'User deleted successfully' });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};