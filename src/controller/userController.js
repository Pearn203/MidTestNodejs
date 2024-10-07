import User from '../model/userModel.js';
import Profile from '../model/profileModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newProfile = new Profile();
    await newProfile.save();

    const newUser = new User({ username, email, password, profileId: newProfile._id });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.signerKey);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.signerKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  // Xóa token từ phía client
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { fullName, dateOfBirth, placeOfBirth, nationality, education, skills, projects, workExperience, hobbies, personalGoals } = req.body;

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.fullName = fullName;
    profile.dateOfBirth = dateOfBirth;
    profile.placeOfBirth = placeOfBirth;
    profile.nationality = nationality;
    profile.education = education;
    profile.skills = skills;
    profile.projects = projects;
    profile.workExperience = workExperience;
    profile.hobbies = hobbies;
    profile.personalGoals = personalGoals;

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('profileId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.profileId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findById(user.profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.set(req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
