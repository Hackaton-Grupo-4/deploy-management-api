import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { NextFunction, Request, Response } from 'express'

export default (req: Request, _: Response, next: NextFunction): void => {
  req.on('end', () => {
    const handler = async (): Promise<void> => await PrismaHelper.disconnect()

    handler().catch(error => console.error(error))
  })
  next()
}
