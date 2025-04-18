/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging operations
 */

/**
 * @swagger
 * /api/message/messages:
 *   post:
 *     summary: Send a message to a contact
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - content
 *             properties:
 *               receiverId:
 *                 type: string
 *                 example: 607f1f77bcf86cd799439011
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid request or no accepted contact
 *       403:
 *         description: No accepted contact between sender and receiver
 */

// /**
//  * @swagger
//  * /api/message/messages/{contactId}:
//  *   get:
//  *     summary: Get messages with a contact
//  *     tags: [Messages]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: contactId
//  *         required: true
//  *         schema:
//  *           type: string
//  *           example: 607f1f77bcf86cd799439011
//  *       - in: query
//  *         name: page
//  *         required: false
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *       - in: query
//  *         name: limit
//  *         required: false
//  *         schema:
//  *           type: integer
//  *           default: 10
//  *     responses:
//  *       200:
//  *         description: Fetched messages
//  *       400:
//  *         description: Invalid parameters
//  */
// /**
//  * @swagger
//  * tags:
//  *   name: Messages
//  *   description: Messaging operations
//  */

/**
 * @swagger
 * /api/messages/{contactId}:
 *   get:
 *     summary: Get messages with a contact
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *           example: 680222a8741bbb62001181f2  # Replace with a real contact ID
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           description: The page number for pagination (defaults to 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           description: The number of messages per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Fetched messages successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sender:
 *                     type: string
 *                     description: ID of the sender
 *                   receiver:
 *                     type: string
 *                     description: ID of the receiver
 *                   content:
 *                     type: string
 *                     description: The message content
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the message was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the message was last updated
 *       400:
 *         description: Invalid parameters or contact not found
 *       403:
 *         description: No accepted contact between sender and receiver
 *       404:
 *         description: No messages found for the specified contact
 */
