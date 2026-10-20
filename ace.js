#!/usr/bin/env node

import 'reflect-metadata'
import { binPath } from '@adonisjs/core'

process.title = 'adonis-react-vite ace'
await binPath(new URL('./build/adonisrc/ace.js', import.meta.url))
