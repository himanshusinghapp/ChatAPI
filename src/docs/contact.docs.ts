/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management
 */

/**
 * @swagger
 * /api/contacts/request:
 *   post:
 *     summary: Send a contact request
 *     tags: [Contacts]
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
 *             properties:
 *               receiverId:
 *                 type: string
 *                 example: 607f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Contact request sent successfully
 *       400:
 *         description: Already exists or invalid request
 */

/**
 * @swagger
 * /api/contacts/accept:
 *   post:
 *     summary: Accept a contact request
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderId
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: 607f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Contact request accepted successfully
 *       400:
 *         description: Invalid request or already accepted
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get list of accepted contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accepted contacts fetched successfully
 *       404:
 *         description: No accepted contacts found
 */
