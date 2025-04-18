export const MESSAGES = {
    USER: {
      CREATED: 'User registered successfully',
      LOGIN_SUCCESS: 'Login successful',
      PROFILE_FETCHED: 'User profile fetched successfully',
      PROFILE_UPDATED: 'User profile updated successfully',
      NOT_FOUND: 'User not found',
    },
    AUTH: {
      UNAUTHORIZED: 'Authentication failed',
      FORBIDDEN: 'Access forbidden',
    },
    CONTACT: {
        REQUEST_SENT: 'Contact request sent successfully.',
        REQUEST_ACCEPTED: 'Contact request accepted.',
        ALREADY_FRIEND: 'You are already connected with this user.',
        REQUEST_ALREADY_SENT: 'Contact request has already been sent to this user.',
        REQUEST_NOT_FOUND: 'Contact request not found.',
        CONTACT_NOT_FOUND: 'Contact not found.',
        CONTACTS_LIST: 'Fetched all accepted contacts.',
        ONLY_ACCEPTED_CONTACTS: 'Only accepted contacts can send messages.',
        PENDING_REQUEST: 'You have a pending contact request with this user.',
        SELF_CONTACT_REQUEST: 'You cannot send a contact request to yourself.',
        REQUEST_ALREADY_EXISTS: 'A contact request already exists between you and this user.',
        NO_ACCEPTED_CONTACTS: 'You have no accepted contacts yet.',
        ACCEPTED_CONTACTS_FETCHED: 'Fetched all accepted contacts successfully.',
      },
      MESSAGES: {
        SENT_SUCCESS: 'Message sent successfully',
        MESSAGES_FETCHED: 'Messages fetched successfully',
        INVALID_CONTACT: 'The contact is not valid or has not been accepted',
        MESSAGE_TOO_LONG: 'Message content is too long. Please keep it under 1000 characters.',
      },
    COMMON: {
      BAD_REQUEST: 'Bad request',
      INTERNAL_ERROR: 'Something went wrong',
      NOT_FOUND: 'Resource not found',
    },
  };
  