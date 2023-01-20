const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const multer = require("multer");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const ratelimit = require("express-rate-limit");
const app = express();
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Server started on port ${port}`));

/// rate limiting
const limiter = ratelimit({
  windowMs: 2 * 60 * 1000, // 10 min
  max: 5,
  message: "Too many requests, please try again after 2 min",
});

app.use("/limiter", limiter);
app.use("/multiple", limiter);

app.get("/limiter", (req, res) => {
  res.send([{ id: 100, title: "Dress", quantity: 2 }]);
});
/// created api doc using swaggger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["server.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books!
 *     responses:
 *       200:
 *        description: success
 *
 */
app.get("/books", (req, res) => {
  res.send([
    {
      id: 100,
      title: "Harry porter",
    },
  ]);
});
/**
 * @swagger
 * /books:
 *   post:
 *   description: Create a new book
 *   parameters:
 *        name: title
 *        description: title of the book
 *        in: formData
 *        required: true
 *        type: string
 *   responses:
 *       201:
 *        description: Created
 *
 */
app.post("/books", (req, res) => {
  res.status(201).send();
});

/// upload image using multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} --- ${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorage });

/// post req for img
app.post("/single", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    res.send("Single image upload successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.post("/multiple", upload.array("images", 3), async (req, res) => {
  try {
    console.log(req.file);
    res.send("Multiple images upload successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

/// array of multiple team members
const multipleNumbers = [
  { id: 121, number: "+923078107414" },
  { id: 122, number: "+923226508654" },
  { id: 123, number: "+923216664738" },
];

//// HTTP post req for sending msg
app.post("/whatsappmsg", (req, res) => {
  console.log(req.body.code);
  const sendMsg = multipleNumbers.find((value) => {
    if (value.id === parseInt(req.body.code)) {
      return multipleNumbers;
    }
  });
  console.log(req.body.code);
  console.log(sendMsg);

  ////// send msg to whatsapp using whatsapp-webjs
  const client = new Client({
    authStrategy: new LocalAuth(), //// store session onces
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Client is ready!");

    // Number where i want to send the message.
    const number = sendMsg.number;
    console.log(number);
    // my message.
    const text = req.body.message;

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text);
  });
  client.initialize();
});
