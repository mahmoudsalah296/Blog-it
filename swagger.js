const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for Blog-it web application',
  },
  servers: [
    {
      url: 'https://blog-it-zjku.onrender.com',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          profilePicture: { type: 'string' },
          bio: { type: 'string' },
          isAdmin: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['username', 'email', 'password'],
      },
      Post: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          body: { type: 'string' },
          author: { $ref: '#/components/schemas/User' },
          categories: { type: 'array', items: { type: 'string' } },
          comments: { type: 'array', items: { type: 'string' } },
          image: { type: 'string' },
          fileUrl: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['title', 'body', 'author'],
      },
      Comment: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          body: { type: 'string' },
          username: { type: 'string' },
          author: { $ref: '#/components/schemas/User' },
          post: { $ref: '#/components/schemas/Post' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['body', 'username', 'author', 'post'],
      },
      Category: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['name'],
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
