import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import 'reflect-metadata'
import * as process from 'process'
import { useCmdService } from '~/utils/service/cmd/cmd'
import { Logger } from 'tslog'
import { AppDataSource } from '~/data-source'

!(async () => {
    const logger = new Logger()
    const { manager } = await AppDataSource.initialize()
    const { initAdmin, initEmployees } = useCmdService(manager)
    const args = await yargs(hideBin(process.argv))
        .command('initAdminData', 'initialise admin data')
        .command('initEmployeeData', 'initialise employee data')
        .help().argv

    try {
        switch (args._[0]) {
            case 'initAdminData':
                await initAdmin()
                break
            case 'initEmployeeData':
                await initEmployees()
                break
        }
    } catch (e) {
        logger.error(e)
        process.exit(-1)
    }
    process.exit(0)
})()
