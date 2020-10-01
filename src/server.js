const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");

const app = express();

app.use(cors());
app.use(bodyParser.text({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/pdf", function (req, res) {
  const svg = req.body;
  const buffers = [];
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    bufferPages: true,
    margin: 50,
  });

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const data = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(data),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=tuckbox.pdf",
      })
      .end(data);
  });

  const fonts = Array.from(
    fs.readdirSync(path.resolve(__dirname, "..", "static"))
  ).filter((file) => /\.ttf|otf|woff|woff2$/.test(file));

  SVGtoPDF(doc, svg, 50, 50, {
    fontCallback(family) {
      const face = family
        .replace(/["']/g, "")
        .replace(/-/g, " ")
        .replace(/ /g, "");
      const match = fonts.find((font) => new RegExp(face).test(font));

      if (match) {
        doc.registerFont(face, path.resolve(__dirname, "..", "static", match));
        return face;
      }

      return "Helvetica";
    },
  });

  doc.end();
});

app.listen(process.env.PORT || 8080);
