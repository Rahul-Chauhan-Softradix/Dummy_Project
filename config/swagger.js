const swaggerJsdoc = require('swagger-jsdoc')


const options = {
    definition:{
        opneapi:'3.0.0',
        info:{
            title:"Node js api for Dummy Project",
            version:'1.0.0'
        },
        servers:[
            {
              url:"localhost:3000/"
            }
        ]
    },
    apis:['../src/user/index'],
    
}


const swaggerSpec = swaggerJsdoc(options)
swaggerSpec.tags = ["admin"]

swaggerSpec.path = {
    "/auth/signup": {
        "post": {
          "tags": ["auth"],
          "summary": "APi for user registration",
          "parameters": [
            {
              "name": "body",
              "in": "body",
              "required": true,
              "type": "object",
              "schema": {
                "properties": {
                  "first_name": {
                    "type": "string"
                  },
                  "last_name": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "phone_number": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "ok"
            }
          },
          "security": [
            {
              "authorization": []
            }
          ]
        }
      }
}

      /**
 * @swagger
 * /user:
 *  get:
 *      summary:This api is used to check
 *      description:This api is used to check
 *      responses:
 *            200:
 *                description: to test get method
 */

module.exports = swaggerSpec