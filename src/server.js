const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const PDFDocument = require("pdfkit");
const SVGtoPDF = require("svg-to-pdfkit");

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/pdf", function (req, res) {
  const svg = req.body;
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  SVGtoPDF(doc, svg);

  doc.pipe(res);
  doc.end();
});

app.listen(process.env.PORT || 8080);
