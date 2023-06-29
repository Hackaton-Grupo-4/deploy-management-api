import { AddPostRepository, DeletePostRepository, FindPostRepository, UpdatePostRepository } from '@/data/protocols/db'
import { FindPost, UpdatePost } from '@/domain/usecases'
import { Context } from '@/infra/db/prisma/helpers/context'
import { postFormatter } from '@/utils'

export class PostRepository implements
  AddPostRepository,
  FindPostRepository,
  UpdatePostRepository, 
  DeletePostRepository {
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
            id: +params.userId
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
    const post = await this.context.prisma.post.findFirst({
      where: { id: +params.id, active: true },
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

  async delete(params: DeletePostRepository.Params): Promise<DeletePostRepository.Result> {
    const post = await this.context.prisma.post.update({
      where: { id: +params.id },
      data: {
        active: false
      },
      select: {
        id: true,
        title: true,
        active: true
      }
    })

    return post
  }
}
