import { Request, Response } from 'express';
import { Message } from '@models/message.model';
import { sendSuccessResponse, sendErrorResponse } from '@common/helpers/response';
import { MESSAGES } from '@common/constants/messages';
import { HTTP_STATUS } from '@common/constants/httpStatus';
import { logger } from '@utils/logger';
import { Contact } from '@models/contact.model';
import { sendMail } from '@services/mailer.service';

// Send message to a contact
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { receiverId, content } = req.body;
  const senderId = (req as any).user.id;

  try {
    // Validate if receiver exists as a contact or is in the accepted contacts
    const contact = await Contact.findOne({
      sender: senderId,
      receiver: receiverId,
      status: 'accepted',
    });
    if (!contact) {
      logger.warn(`Failed to send message: No accepted contact between ${senderId} and ${receiverId}`);
      sendErrorResponse(res, MESSAGES.CONTACT.NO_ACCEPTED_CONTACTS, HTTP_STATUS.FORBIDDEN);
      return;
    }

    const message = await Message.create({ sender: senderId, receiver: receiverId, content });
    logger.info(`Message sent from ${senderId} to ${receiverId}: ${content}`);
    
    sendSuccessResponse(res, MESSAGES.MESSAGES.SENT_SUCCESS, message);
  } catch (err: any) {
    logger.error(`Error sending message: ${err.message}`);
    sendErrorResponse(res, MESSAGES.COMMON.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

// Get paginated messages for a contact
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  const contactId = req.params.contactId;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const senderId = (req as any).user.id;

  try {
    // Fetch messages between the sender and the contact
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: contactId },
        { sender: contactId, receiver: senderId },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    logger.info(`Fetched ${messages.length} messages between ${senderId} and ${contactId}`);
    sendSuccessResponse(res, MESSAGES.MESSAGES.MESSAGES_FETCHED, messages);
  } catch (err: any) {
    logger.error(`Error fetching messages for contact ${contactId}: ${err.message}`);
    sendErrorResponse(res, MESSAGES.COMMON.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
