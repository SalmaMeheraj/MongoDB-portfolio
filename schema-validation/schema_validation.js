db.createCollection("movies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",

      required: [
        "title",
        "year",
        "runtime",
        "rating",
        "releaseDate",
        "language"
      ],
      properties: {
       _id: {
          bsonType: "objectId",
          description: "_id must be ObjectId"
        },

        title: {
          bsonType: "string",
          description: "Movie title must be a string"
        },

        year: {
          bsonType: "int",
          minimum: 1888,
          description: "Year must be an integer >= 1888"
        },

        runtime: {
          bsonType: "int",
          minimum: 1,
          description: "Runtime must be a positive integer"
        },

        rating: {
          bsonType: "double",
          minimum: 0,
          maximum: 10,
          description: "Rating must be between 0 and 10"
        },

        releaseDate: {
          bsonType: "date",
          description: "Release date must be a date"
        },

        language: {
          bsonType: "string",
          description: "Primary language of the movie"
        },

        genres: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Genres must be an array of strings"
        },

        cast: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name", "role"],
            properties: {
              name: { bsonType: "string" },
              role: { bsonType: "string" }
            }
          },
          description: "Cast must be an array of objects"
        },

        director: {
          bsonType: "string",
          description: "Director name must be a string"
        },

        producer: {
          bsonType: "string",
          description: "Producer name must be a string"
        },

        budget: {
          bsonType: "long",
          minimum: 0,
          description: "Budget must be a positive number"
        },

        boxOffice: {
          bsonType: "long",
          minimum: 0,
          description: "Box office collection must be positive"
        },

        awards: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Awards must be an array of strings"
        },

        isReleased: {
          bsonType: "bool",
          description: "Release status must be boolean"
        },

        createdAt: {
          bsonType: "date",
          description: "Creation timestamp"
        }

      }
    }
  },

  validationLevel: "strict",
  validationAction: "error"
});


db.movies.insertOne({
  title: "Inception",
  year: 2010,
  runtime: 148,
  rating: 8.8,
  releaseDate: ISODate("2010-07-16"),
  language: "English",
  genres: ["Sci-Fi", "Action"],
  cast: [
    { name: "Leonardo DiCaprio", role: "Cobb" },
    { name: "Joseph Gordon-Levitt", role: "Arthur" }
  ],
  director: "Christopher Nolan",
  producer: "Emma Thomas",
  budget: 160000000,
  boxOffice: 829895144,
  awards: ["Oscar", "BAFTA"],
  isReleased: true,
  createdAt: new Date()
});


Invalid Insert Examples (FAIL):
Missing required field
db.movies.insertOne({
  title: "Interstellar"
});
Error: Document failed validation

Wrong data type:
db.movies.insertOne({
  title: "Avatar",
  year: "2009",
  runtime: 162,
  rating: 9,
  releaseDate: new Date(),
  language: "English"
});
Error: year must be int
