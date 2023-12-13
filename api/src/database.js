import './dotenv.js';
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL);

const UserModel = mongoose.model('User', { name: String, email: String, password: String });

export { UserModel };
