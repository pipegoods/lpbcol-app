import path from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'

const BD_PATH = path.join(process.cwd(), 'db')

const readDBFile = (dnName) => {
  return readFile(`${BD_PATH}/${dnName}.json`, 'utf-8').then(JSON.parse)
}

export const TEAMS = await readDBFile('teams')

export const writeDBFile = (dnName, data) => {
  return writeFile(
    `${BD_PATH}/${dnName}.json`,
    JSON.stringify(data, null, 2),
    'utf-8'
  )
}
