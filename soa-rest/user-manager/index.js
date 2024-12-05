import { insert_User, get_User, get_Users, delete_User } from './database.js';
import { User } from './user.js';
import express from 'express'; 
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SOA rest',
        version: '1.0.0',
        description: 'SOA rest',
      },
    },
    apis: ['./index.js'],  
  };
  const swaggerSpec = swaggerJSDoc(swaggerOptions);

const  PORT = 8080 ;
app.listen(
    PORT,
    () => console.log( `it's alive on https://localhost:${PORT}` )
)
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: This endpoint retrieves a list of all users from the database.
 *     operationId: getUsers
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "user@example.com"
 *                   phone:
 *                     type: string
 *                     example: "123-456-7890"
 *                   fname:
 *                     type: string
 *                     example: "John"
 *                   lname:
 *                     type: string
 *                     example: "Doe"
 *                   dob:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *                   address:
 *                     type: string
 *                     example: "1234 Main St, City, Country"
 *                   pass:
 *                     type: string
 *                     example: "password123"
 *       500:
 *         description: Internal server error.
 */
app.get('/api/users', async (req, res) => {
    
        res.status(200).send(await get_Users());


});
/**
 * @swagger
 * /api/user/{email}:
 *   get:
 *     summary: Get a user by email
 *     description: This endpoint retrieves the details of a user based on the provided email address.
 *     operationId: getUserByEmail
 *     parameters:
 *       - name: email
 *         in: path
 *         description: The email of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 phone:
 *                   type: string
 *                   example: "123-456-7890"
 *                 fname:
 *                   type: string
 *                   example: "John"
 *                 lname:
 *                   type: string
 *                   example: "Doe"
 *                 dob:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 address:
 *                   type: string
 *                   example: "1234 Main St, City, Country"
 *       404:
 *         description: User not found with the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email not found"
 */
app.get('/api/user/:email', async (req, res) => {
    try{
        const { email } = req.params;
        const user = await get_User(email)
        if (!user)
            res.status(404).send('email not found')


        res.status(200).send(user);
    }catch(err){
        //next(err);
    }

});
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows you to create a new user by providing all user details.
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
 *       418:
 *         description: Error - Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email and Password are required."
 */
app.post('/api/user', async (req,res) => {
    try{
        //const { id } = req.params;
        //const user = new User(req.body)
        const { email, phone, fname, lname, dob, address, pass } = req.body;
        if(!email ||!pass){
            res.status(418).send({message: 'Email and Password are required'});
            return
        }
        
        const user = new User(email,phone,fname,lname,dob,address,pass);
        if(await get_User(email)){
            res.status(409).send({message: 'Email already exists'});
        }else{
            await insert_User(user)
            res.status(201).send({
                'user created': `🤖 with your email: ${email}` 
            });
        }
    }catch(err){
        //next(err);
        console.log(err)
    }

});
const swaggerSpecWithSchemas = {
    ...swaggerSpec,
    components: {
        schemas: {
            // Define User schema
            User: {
                type: 'object',
                properties: {
                    email: { type: 'string', example: 'john.doe@example.com' },
                    phone: { type: 'string', example: '123-456-7890' },
                    fname: { type: 'string', example: 'John' },
                    lname: { type: 'string', example: 'Doe' },
                    dob: { type: 'string', format: 'date', example: '1990-01-01' },
                    address: { type: 'string', example: '1234 Elm Street, Springfield, IL' },
                    pass: { type: 'string', example: 'password123' },
                },
            },

            // Define UserResponse schema (example of response structure)
            UserResponse: {
                type: 'object',
                properties: {
                    'user created': { type: 'string', example: '🤖 with your email: john.doe@example.com' },
                    user: {
                        type: 'object',
                        properties: {
                            email: { type: 'string', example: 'john.doe@example.com' },
                            phone: { type: 'string', example: '123-456-7890' },
                            fname: { type: 'string', example: 'John' },
                            lname: { type: 'string', example: 'Doe' },
                            dob: { type: 'string', format: 'date', example: '1990-01-01' },
                            address: { type: 'string', example: '1234 Elm Street, Springfield, IL' },
                            pass: { type: 'string', example: 'hashed_password' },
                        },
                    },
                },
            },
        },
    },
};
/**
 * @swagger
 * /api/user/{email}:
 *   delete:
 *     summary: Delete a user by email
 *     description: This endpoint deletes a user based on the provided email address. If the user is not found, a 404 status is returned.
 *     operationId: deleteUserByEmail
 *     parameters:
 *       - name: email
 *         in: path
 *         description: The email of the user to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *     responses:
 *       204:
 *         description: User successfully deleted.
 *       404:
 *         description: User not found with the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
app.delete('/api/user/:email', async (req,res) =>{
    try{
        const { email } = req.params;
        if(await get_User(email)){
            await delete_User(email);
            res.status(204).send(`user with email: ${email} was successfully deleted`)
        }else{
            res.status(404).send("user not found");
        }
    }catch(err){
        next(err);
    }

});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecWithSchemas));
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    
    console.error(err);
    
    res.status(statusCode).send({ message });
});