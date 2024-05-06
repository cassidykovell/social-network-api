const mongoose = require('mongoose');
const { User, Thought } = require('./data');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const userData = [
  {
    username: 'jeanne_ruby',
    email: 'jeanneruby@mgmail.com',
  },
  {
    username: 'will_maloney',
    email: 'will_maloney@gmail.com',
  },
  {
    username: 'dawn_yonka',
    email: 'dawn_yonka@gmail.com',
  },
  {
    username: 'liz_brack',
    email: 'lizbrack@gmail.com',
  },
  {
    username: 'robert_william',
    email: 'robert_william.com',
  }
];

const thoughtData = [
  {
    thoughtText: 'I love architecture!',
    username: 'jeanne_ruby',
    reactions: [
      {
        reactionBody: 'Me too!',
        username: 'liz_brack',
      },
      {
        reactionBody: 'Cool!',
        username: 'robert_william',
      },
    ],
  },
  {
    thoughtText: 'I think airbrush is my favorite artistic medium.',
    username: 'will_maloney',
    reactions: [
      {
        reactionBody: 'Your so good at it ',
        username: 'robert_william',
      },
      {
        reactionBody: 'You should make me something.',
        username: 'dawn_yonka',
      },
    ],
  },
  {
    thoughtText: 'I am gonna write a book.',
    username: 'john_doe',
    reactions: [
      {
        reactionBody: 'Can not wait!',
        username: 'jeanne_ruby',
      },
      {
        reactionBody: 'Go liz!',
        username: 'robert_william',
      },
    ],
  },
  {
    thoughtText: 'Dogs r sick',
    username: 'dawn_yonka',
    reactions: [
      {
        reactionBody: 'True',
        username: 'will_maloney',
      },
      {
        reactionBody: 'And so cute!',
        username: 'liz_brack',
      },
    ],
  },
  {
    thoughtText: 'The stock market is crazy right now',
    username: 'robert_william',
    reactions: [
      {
        reactionBody: 'Oh no!',
        username: 'will_maloney',
      },
      {
        reactionBody: 'Interesting perspective',
        username: 'liz_brack',
      },
    ],
  }
];

const seedDatabase = async () => {
  try {
    await User.deleteMany();
    await Thought.deleteMany();

    const users = await User.insertMany(userData);

    thoughtData.forEach(async thought => {
      thought.username = users.find(user => user.username === thought.username)._id;
      thought.reactions.forEach(reaction => {
        reaction.username = users.find(user => user.username === reaction.username)._id;
      });
    });

    await Thought.insertMany(thoughtData);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();