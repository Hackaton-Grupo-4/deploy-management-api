import { AddPostRepository, FindPostRepository, UpdatePostRepository } from '@/data/protocols/db'
import { UpdatePost } from '@/domain/usecases'
import { Context } from '@/infra/db/prisma/helpers/context'
import { postFormatter } from '@/utils'

export class PostRepository implements
  AddPostRepository,
  FindPostRepository,
  UpdatePostRepository {
  constructor(
    private readonly context: Context
  ) { }
  async update(postData: UpdatePost.Params, postId: number): Promise<UpdatePostRepository.Result> {
    const post = await this.context.prisma.post.update({
      data: {
        description: postData.description ?? undefined,
        syntax: postData.syntax ?? undefined,
        title: postData.title ?? undefined,
        version: postData.version ?? undefined,
        postDate: new Date(postData.postDate) ?? undefined,
        fkApplication: {
          connect: {
            id: postData?.applicationId ?? undefined
          }
        },
        fkPlatform: {
          connect: {
            id: postData?.platformId ?? undefined
          }
        },
        postHasPostClassification: {
          createMany: {
            data: postData.postClassificationId.map(id => ({
              postClassificationId: id
            }))
          }
        },
        fkUser: {
          connect: {
            id: Number(postData.userId)
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
      },
      where: {
        id: Number(postId)
      }
    })
    return postFormatter(post)
  }

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
