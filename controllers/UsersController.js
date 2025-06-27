import { ObjectId } from 'mongodb';
import crypto from 'crypto';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    try {
      const usersCollection = dbClient.db.collection('users');

      // Check if email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      // Create new user
      const result = await usersCollection.insertOne({ email, password: hashedPassword });

      return res.status(201).json({ id: result.insertedId.toString(), email });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static async getMe(req, res) {
    const token = req.headers['x-token'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      return res.status(200).json({ id: user._id.toString(), email: user.email });
    } catch (e) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default UsersController;
