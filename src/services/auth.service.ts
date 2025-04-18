import bcrypt from 'bcrypt';
import { User } from '@models/user.model';
import { generateToken } from '@utils/jwt';
import { logger } from '@utils/logger';

export const signup = async (name: string, email: string, password: string) => {
    const existing = await User.findOne({ email });
    if (existing) {
      logger.warn(`Signup attempt for existing email: ${email}`);
      throw new Error('User already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
  
    logger.info(`User created with ID: ${user._id}`);
    return generateToken({ id: user._id });
  };
  

  export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: User not found for email: ${email}`);
      throw new Error('Invalid email or password');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Invalid password for email: ${email}`);
      throw new Error('Invalid email or password');
    }
  
    logger.info(`User successfully logged in: ${email}`);
    return generateToken({ id: user._id });
  };