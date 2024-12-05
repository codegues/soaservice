import express from 'express'
import { User } from './user.js';
import { get_User } from '../usr_manager/database.js';
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
const PORT = '8081';
  app.listen(
    PORT,
    () => console.log( `it's alive on https://localhost:${PORT}` )
);
/**
 * @swagger
 * /api/validate:
 *   post:
 *     summary: Validate user login credentials
 *     description: Authenticates a user based on their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               pass:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *       401:
 *         description: Wrong email or password combination.
 *       400:
 *         description: Bad request if required parameters are missing.
 */
app.post('/api/validate',async (req,res,next)=>{
    try{
        const {email, pass} = req.body;
        const claim = new User(email,undefined,undefined,undefined,undefined,undefined,pass);
        const user = await get_User(email);
    
        if(!user || claim.password !== user['Password']){
            res.status(401).send("Wrong Email and Password combination");
            return
        }
        res.status(200).send("User authenticated successfully")
        }catch(err){
            next(err);
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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecWithSchemas));
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    
    console.error(err);
    
    res.status(statusCode).send({ message });
  });
  
  