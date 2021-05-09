import fs from 'fs-extra'
import puppeteer from 'puppeteer'
import capture from 'capture-website'
import { isURL } from '../utils/isURL.js'

const DEFAULT_OPTIONS = Object.freeze({
  width: 1200,
  height: 630,
})

/**
 *
 */
export interface IScreenshot {
  html: string
  output: string
  options: ScreenshotOptions
}

/**
 *
 */
export type ScreenshotOptions = capture.Options
export type ScreenshotPrivate = ScreenshotOptions & {
  _keepAlive?: boolean
  _browser?: undefined | puppeteer.Browser
}

/**
 *
 * @param param0
 * @returns
 */
export async function screenshot({ html, output, options = {} }: IScreenshot) {
  const isRemote = isURL(html)

  const _options = Object.assign({}, options, {
    inputType: isRemote ? 'url' : 'html',
  })

  const config = Object.assign({}, DEFAULT_OPTIONS, _options)

  const buffer = await capture.buffer(html, config)

  await fs.outputFile(output, buffer, {
    encoding: 'utf-8',
  })

  return output
}