const puppeteer = require("puppeteer")
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib")
const fs = require("fs")
const path = require("path")

async function screenshotToPDF(url) {
  // Launch a new browser instance
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Go to the specified URL
  await page.goto(url)

  // Take a screenshot of the page
  const screenshotBuffer = await page.screenshot()

  await browser.close()

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()
  const pageWidth = 600 // Define page width or fetch it from screenshot
  const pageHeight = 800 // Define page height or fetch it from screenshot

  // Embed the screenshot in the PDF document
  const jpgImage = await pdfDoc.embedJpg(screenshotBuffer)
  const page = pdfDoc.addPage([pageWidth, pageHeight])
  page.drawImage(jpgImage, {
    x: page.getWidth() / 2 - jpgImage.width / 2,
    y: page.getHeight() / 2 - jpgImage.height / 2,
    width: jpgImage.width,
    height: jpgImage.height,
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Write the pdfBytes to a file
  fs.writeFileSync("output.pdf", pdfBytes)
}

screenshotToPDF("https://example.com")
