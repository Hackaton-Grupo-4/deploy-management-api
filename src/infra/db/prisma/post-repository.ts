import { AddPostRepository, FindPostRepository } from '@/data/protocols/db'
import { FindPost } from '@/domain/usecases'
import { Context } from '@/infra/db/prisma/helpers/context'
import { postFormatter } from '@/utils'

export class PostRepository implements
  AddPostRepository,
  FindPostRepository {
  constructor(
    private readonly context: Context
  ) { }

  async add(params: AddPostRepository.Params): Promise<AddPostRepository.Result> {
    const post = await this.context.prisma.post.create({
      data: {
        description: params.description,
        syntax: params.syntax,
        title: params.title,
        version: params.version,
        postDate: new Date(params.postDate),
        fkApplication: {
          connect: {
            id: params?.applicationId
          }
        },
        fkPlatform: {
          connect: {
            id: params?.platformId
          }
        },
        postHasPostClassification: {
          createMany: {
            data: params.postClassificationId.map(id => ({
              postClassificationId: id
            }))
          }
        },
        fkUser: {
          connect: {
            id: 1
          }
        }
      },
      select: {
        id: true,
        title: true,
        version: true,
        syntax: true,
        description: true,
        postDate: true,
        fkApplication: {
          select: {
            id: true,
            description: true
          }
        },
        fkPlatform: {
          select: {
            id: true,
            description: true
          }
        },
        postHasPostClassification: {
          select: {
            fkPostClassification: {
              select: {
                id: true,
                description: true
              }
            }
          }
        }
      }
    })

    return postFormatter(post)
  }

  async find(params: FindPostRepository.Params): Promise<FindPostRepository.Result> {
    const post = await this.context.prisma.post.findUnique({
      where: { id: +params.id },
      select: {
        id: true,
        title: true,
        syntax: true,
        version: true,
        description: true,
        postDate: true,
        fkApplication: {
          select: {
            id: true,
            description: true,
          }
        },
        fkPlatform: {
          select: {
            id: true,
            description: true
          }
        },
        postHasPostClassification: {
          select: {
            fkPostClassification: {
              select: {
                id: true,
                description: true
              }
            }
          }
        }
      }
    })

    if (!post) return

    return postFormatter(post)
  }
}
