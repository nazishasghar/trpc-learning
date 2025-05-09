import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { useUtilityFunction } from '~/utils/util'
import { EmployeeEntities } from '~/entities/employee/employee.entities'
import { position } from '~/types/common'
import { EntityManager } from 'typeorm'
import { AdminEntities } from '~/entities/admin/admin.entities'

type MapType = {
    name: string
    email: string
    password: string
    bio: string
    position: (typeof position)[number]
    team?: string[]
}

export const useCmdService = (manager: EntityManager) => {
    const { asyncMap } = useUtilityFunction()

    const initAdmin = async () => {
        const adminList: MapType[] = [
            {
                name: 'Shinya Kawamura',
                email: 'kawamura@notespace.jp',
                bio: 'Drinker, Programmer',
                password: '123456789',
                position: 'CEO',
                team: [],
            },
            {
                name: 'Koutara Yabe',
                email: 'koutara@notespace.jp',
                bio: 'Programmer, Manga Reader',
                password: '123456789',
                position: 'CTO',
                team: [],
            },
            {
                name: 'Shinji Ochi',
                email: 'ochi@notespace.jp',
                password: '123456789',
                bio: '知らない',
                position: 'COO',
                team: [],
            },
            {
                name: 'Raido Doi',
                email: 'raido@notespace.jp',
                bio: 'Dart Pro, Cloud Enthusiast, K-Pop',
                password: '123456789',
                position: 'M2',
                team: ['madara@notespace.jp', 'nami@notespace.jp'],
            },
            {
                name: 'Sota Watanabe',
                email: 'sota@notespace.jp',
                password: '123456789',
                bio: 'Bike Enthusiast',
                position: 'M3',
                team: ['leon@notespace.jp', 'prathik@notespace.jp', 'aika@notespace.jp'],
            },
            {
                name: 'Miyuki Sato',
                email: 'taso@notespace.jp',
                password: '123456789',
                bio: 'K-Pop',
                position: 'M1',
                team: ['peco@notespace.jp'],
            },
            {
                name: 'Tsucchi',
                email: 'tsucchi@notespace.jp',
                password: '123456789',
                bio: 'Programming, GT Racing',
                position: 'M3',
                team: [],
            },
        ]

        return await asyncMap<MapType>(adminList, async (i) => {
            const teamPromises = i.team?.length
                ? i.team.map(async (member) => await manager.findOneBy(EmployeeEntities, { email: member }))
                : []

            const team = (await Promise.all(teamPromises)).filter(
                (member): member is EmployeeEntities => member !== null,
            )
            const admin = new AdminEntities({
                ...i,
                uuid: v4(),
                team: [],
                password: await bcrypt.hash(i.password, 10),
            })
            team.forEach((i) => (i.leader = admin))
            admin.team = team

            await manager.transaction(async (mngr) => {
                await Promise.all(team.map(async (i) => await mngr.save(i)))
                await mngr.save(admin)
            })
            return i
        })
    }

    const initEmployees = async () => {
        const employeeList: MapType[] = [
            {
                name: 'Nazish Asghar',
                email: 'madara@notespace.jp',
                bio: 'Programmer, Bike Enthusiast, Traveller, Gamer',
                password: '123456789',
                position: 'J1',
            },
            {
                name: 'Ravi Roshini',
                email: 'nami@notespace.jp',
                password: '123456789',
                bio: 'Car Enthusiast',
                position: 'J1',
            },
            {
                name: 'Mustafa Shihab',
                email: 'leon@notespace.jp',
                password: '123456789',
                bio: 'PS5 Lover',
                position: 'M1',
            },
            {
                name: 'Jennifer',
                email: 'aika@notespace.jp',
                password: '123456789',
                bio: 'Traveller',
                position: 'B1',
            },
            {
                name: 'Prathik',
                email: 'prathik@notespace.jp',
                password: '123456789',
                bio: 'Traveller, Football',
                position: 'B1',
            },
            {
                name: 'Sato',
                email: 'peco@notespace.jp',
                password: '123456789',
                bio: 'Fitness',
                position: 'M2',
            },
            {
                name: 'Yasuda',
                email: 'yasuda@notespace.jp',
                password: '123456789',
                bio: 'Gaming',
                position: 'M2',
            },
            {
                name: 'Takemitsu Suzuki',
                email: 'takemitsu@notespace.jp',
                password: '123456789',
                bio: 'Final Fantasy',
                position: 'S2',
            },
            {
                name: 'Soma',
                email: 'soma@notespace.jp',
                password: '123456789',
                bio: 'Gaming',
                position: 'S1',
            },
        ]
        return await asyncMap<MapType>(employeeList, async (i) => {
            const employee = new EmployeeEntities({
                ...i,
                uuid: v4(),
                feedbacks: [],
                password: await bcrypt.hash(i.password, 10),
            })
            return await manager.save(employee)
        })
    }
    return {
        initAdmin,
        initEmployees,
    }
}
