const dbClient = require('../index');

dbClient.Users.bulkCreate(
  [
    {
      firstName: 'Buyer',
      lastName: 'Buyerovich',
      displayName: 'buyer',
      email: 'buyer@gmail.com', // should be unique
      role: 'customer',
      password: '$2a$05$0RzS9MGQh8bpFWV7a4iIa.xhlAmSEct4RkzmPKwQIFBJz40FSkBUO', // buyer@gmail.com
    },
    {
      firstName: 'Creative',
      lastName: 'Creativovich',
      displayName: 'creative',
      email: 'creative@gmail.com', // should be unique
      role: 'creator',
      password: '$2a$05$BtZIvrMY7uFLZJE4dyWgOehTWPMoPElfv7MGAFI0uDbaCv3PX08Bm', // creative@gmail.com
    },
  ],
);
