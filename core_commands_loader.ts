import { getMetaData, getCommand } from '@adonisjs/core/commands'

type CommandMetaData = Awaited<ReturnType<typeof getMetaData>>[number]

const coreCommandsLoader = {
  async getMetaData(): Promise<CommandMetaData[]> {
    return getMetaData()
  },
  async getCommand(metaData: CommandMetaData) {
    return getCommand(metaData)
  },
}

export default coreCommandsLoader