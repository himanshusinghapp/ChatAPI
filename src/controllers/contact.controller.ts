import { Request, Response } from 'express';
import { Contact } from '@models/contact.model';
import { sendSuccessResponse, sendErrorResponse } from '@common/helpers/response';
import { MESSAGES } from '@common/constants/messages';
import { HTTP_STATUS } from '@common/constants/httpStatus';
import { logger } from '@utils/logger';  // Assuming logger is already set up
import { sendMail } from '@services/mailer.service';
import { User } from '@models/user.model';

// 1. Send Contact Request
export const sendContactRequest = async (req: Request, res: Response): Promise<void> => {
  const { receiverId } = req.body;
  const senderId = (req as any).user.id;  // Assuming authenticated user

  // Ensure sender and receiver are not the same user
  if (senderId === receiverId) {
    sendErrorResponse(res, MESSAGES.CONTACT.SELF_CONTACT_REQUEST, HTTP_STATUS.BAD_REQUEST);
    return;
  }

  // Check if contact request already exists
  const existingRequest = await Contact.findOne({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });

  if (existingRequest) {
    sendErrorResponse(res, MESSAGES.CONTACT.REQUEST_ALREADY_EXISTS, HTTP_STATUS.BAD_REQUEST);
    return;
  }

  // Create new contact request
  const contact = new Contact({
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });

  try {
    await contact.save();
    logger.info(`Contact request sent from user ${senderId} to ${receiverId}`);
    const receiver = await User.findById(receiverId);  // Assuming User model exists
    if (receiver) {
      const receiverEmail = receiver.email;
      await sendMail(
        receiverEmail,
        'New Contact Request',
        `<h1>You have a new contact request!</h1><p>Sender: ${senderId}</p>`
      );
      logger.info(`Email notification sent to ${receiverEmail}`);
    }
    sendSuccessResponse(res, MESSAGES.CONTACT.REQUEST_SENT, contact, HTTP_STATUS.CREATED);
  } catch (err: any) {
    logger.error('Error sending contact request: ' + err.message);
    sendErrorResponse(res, err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

// 2. Accept Contact Request
export const acceptContactRequest = async (req: Request, res: Response): Promise<void> => {
  const { senderId } = req.body;
  const receiverId = (req as any).user.id;

  // Find the contact request
  const contact = await Contact.findOne({ sender: senderId, receiver: receiverId, status: 'pending' });

  if (!contact) {
    sendErrorResponse(res, MESSAGES.CONTACT.REQUEST_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    return;
  }

  // Update status to 'accepted'
  contact.status = 'accepted';
  try {
    await contact.save();
    logger.info(`Contact request accepted from user ${senderId} to ${receiverId}`);
    const sender = await User.findById(senderId);  // Assuming User model exists
    if (sender) {
      const senderEmail = sender.email;
      await sendMail(
        senderEmail,
        'Contact Request Accepted',
        `<h1>Your contact request was accepted!</h1><p>Receiver: ${receiverId}</p>`
      );
      logger.info(`Email notification sent to ${senderEmail}`);
    }
    sendSuccessResponse(res, MESSAGES.CONTACT.REQUEST_ACCEPTED, contact, HTTP_STATUS.OK);
  } catch (err: any) {
    logger.error('Error accepting contact request: ' + err.message);
    sendErrorResponse(res, err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

// 3. Get List of Accepted Contacts
export const getAcceptedContacts = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;  // Assuming user ID is available after authentication

  try {
    // Find all accepted contacts for the user
    const contacts = await Contact.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: 'accepted',
    }).populate('sender receiver', 'name email');  // Populate sender and receiver details

    if (!contacts || contacts.length === 0) {
      sendErrorResponse(res, MESSAGES.CONTACT.NO_ACCEPTED_CONTACTS, HTTP_STATUS.NOT_FOUND);
      return;
    }

    sendSuccessResponse(res, MESSAGES.CONTACT.ACCEPTED_CONTACTS_FETCHED, contacts, HTTP_STATUS.OK);
  } catch (err: any) {
    logger.error('Error fetching accepted contacts: ' + err.message);
    sendErrorResponse(res, err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
