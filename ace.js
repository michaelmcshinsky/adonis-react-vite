#!/usr/bin/env node

import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'

const APP_ROOT = new URL('./', import.meta.url)

const ignitor = new Ignitor(APP_ROOT, {
  environment: process.env.NODE_ENV,
  importer: (filePath) => {
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
      return import(new URL(filePath, APP_ROOT).href)
    }
    return import(filePath)
  },
})

ignitor
  .ace()
  .handle(process.argv.slice(2))
  .catch(prettyPrintError)