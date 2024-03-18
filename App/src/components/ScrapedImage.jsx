import React from 'react'

const ScrapedImage = () => {
  const puppeteer = require("puppeteer")

  async function getScrapedImageURL(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [img] = await page.$x("/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[1]/a[1]/div[1]/img")
    const src = await img.getProperty("src")
    const imgLink = await src.jsonValue()

    return imgLink
  }

  return (
    <img src={getScrapedImageURL("https://www.google.co.uk/search?q=yuck+stock&tbm=isch&ved=2ahUKEwj9utTUtu6EAxXXUqQEHUEpDRUQ2-cCegQIABAA&oq=yuck+stock&gs_lp=EgNpbWciCnl1Y2sgc3RvY2syBxAAGIAEGBgyCRAAGIAEGBgYCkikL1CpG1iVLXAAeACQAQCYAWOgAbQEqgECMTC4AQPIAQD4AQGKAgtnd3Mtd2l6LWltZ8ICBhAAGAcYHsICBRAAGIAEwgIIEAAYgAQYsQOIBgE&sclient=img&ei=giLwZf3xI9elkdUPwdK0qAE&bih=928&biw=1886")}/>
  )
}

export default ScrapedImage