import { Request, Response } from 'express';
import { User } from '@models/user.model';
import { sendSuccessResponse, sendErrorResponse } from '@common/helpers/response';
import { MESSAGES } from '@common/constants/messages';
import { HTTP_STATUS } from '@common/constants/httpStatus';
import { logger } from '@utils/logger';  // Import the logger

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    logger.info(`Fetching profile for user: ${userId}`);  // Log the start of the profile fetch

    const user = await User.findById(userId).select('-password');
    if (!user) {
      logger.warn(`User not found: ${userId}`);  // Log if user is not found
      sendErrorResponse(res, MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      return;
    }

    logger.info(`User profile fetched successfully: ${userId}`);  // Log successful profile fetch
    sendSuccessResponse(res, MESSAGES.USER.PROFILE_FETCHED, user);
  } catch (err:any) {
    logger.error(`Error fetching profile for user: ${userId}, Error: ${err.message}`);  // Log any errors
    sendErrorResponse(res, MESSAGES.COMMON.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
