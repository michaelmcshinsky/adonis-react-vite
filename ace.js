#!/usr/bin/env node

import 'reflect-metadata';
import { Ignitor } from '@adonisjs/core';

const ignitor = new Ignitor(new URL('./', import.meta.url), {
  environment: process.env.NODE_ENV,
});

await ignitor.ace().handle(process.argv.slice(2));
