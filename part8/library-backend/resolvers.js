const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return Book.find({});
      } else if (args.genre) {
        return Book.find({ genres: args.genre });
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const authorId = author._id.toString();
        return Book.find({ author: authorId });
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate("books");
      return authors.map((author) => ({
        ...author.toObject(),
        bookCount: author.books.length,
      }));
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Book: {
    author: async (root) => {
      const authorOfBook = await Author.findById(root.author._id.toString());
      return authorOfBook;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (author) {
        const book = new Book({ ...args, author: author._id });
        try {
          await book.save();
          author.books = author.books.concat(book._id);
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } else {
        const newAuthor = new Author({ name: args.author });

        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }

        const book = new Book({ ...args, author: newAuthor._id });

        try {
          await book.save();
          newAuthor.books = newAuthor.books.concat(book._id);
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      }
    },
    editAuthor: async (root, args, context) => {
      const authorToChange = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        authorToChange.born = args.setBornTo;
        await authorToChange.save();
      } catch (error) {
        throw new GraphQLError("Can't find author to edit", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return authorToChange;
    },
    createUser: async (root, args) => {
      const user = User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
