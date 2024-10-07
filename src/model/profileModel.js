import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true }
    }
  ],
  skills: [{ type: String, required: true }],
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      role: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date }
    }
  ],
  workExperience: [
    {
      company: { type: String, required: true },
      position: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date }
    }
  ],
  hobbies: [{ type: String, required: true }],
  personalGoals: [{ type: String, required: true }]
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
