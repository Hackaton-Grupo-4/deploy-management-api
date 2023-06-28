import prisma from './client'

export const PrismaHelper = {
  prisma,
  async disconnect (): Promise<void> {
    console.log('Desconectando...')
    await this.prisma.$disconnect()
  }
}
