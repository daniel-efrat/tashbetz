const express = require("express")
const puppeteer = require("puppeteer")
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib")
const fs = require("fs")

const app = express()

app.post("/takeScreenshot", async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // This would be your application's URL
  await page.goto("https://tashbetzli.netlify.app")

  const screenshotBuffer = await page.screenshot()
  await browser.close()

  const pdfDoc = await PDFDocument.create()
  const pageWidth = 600
  const pageHeight = 800

  const jpgImage = await pdfDoc.embedJpg(screenshotBuffer)
  const pdfPage = pdfDoc.addPage([pageWidth, pageHeight])
  pdfPage.drawImage(jpgImage, {
    x: pdfPage.getWidth() / 2 - jpgImage.width / 2,
    y: pdfPage.getHeight() / 2 - jpgImage.height / 2,
    width: jpgImage.width,
    height: jpgImage.height,
  })

  const pdfBytes = await pdfDoc.save()

  res.contentType("application/pdf")
  res.send(pdfBytes)
})

app.listen(5500, () => console.log("Listening on port 5500..."))
