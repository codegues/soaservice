import * as crypto from 'crypto'
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           example: "123-456-7890"
 *         fname:
 *           type: string
 *           example: "John"
 *         lname:
 *           type: string
 *           example: "Doe"
 *         dob:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         address:
 *           type: string
 *           example: "1234 Elm Street, Springfield, IL"
 *         pass:
 *           type: string
 *           example: "password123"
 *     UserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "User created successfully"
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint creates a new user by providing user details.
 *     operationId: createUser
 *     requestBody:
 *       description: User details to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */
export class User {
    /**
     * Creates a new User instance.
     * @param {string} email - User's email address.
     * @param {string} phone - User's phone number.
     * @param {string} firstname - User's first name.
     * @param {string} lastname - User's last name.
     * @param {string} dateofbirth - User's date of birth (YYYY-MM-DD).
     * @param {string} address - User's address.
     * @param {string} password - User's password.
     */
    constructor(email, phone, fname, lname, dob, address, pass) {
        this.email = email;
        this.phone = phone;
        this.firstname = fname;
        this.lastname = lname;
        this.dateofbirth = dob;
        this.address = address;
        this.password =  crypto.createHash('md5').update(pass).digest('hex');
    }

}