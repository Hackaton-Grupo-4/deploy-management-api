export const historySchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        },
        user: {
            name: {
                type: 'string'
            },
            role: {
                type: 'string'
            },
        },
        application: {
            description: {
                type: 'string'
            },
        },
        platform: {
            description: {
                type: 'string'
            },
        },
        postHasPostClassifications: [{
            postClassification: {
                description: {
                    type: 'string'
                },
            }
        }],
        version: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        syntax: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        created_at: {
            type: 'string'
        },
        updated_at: {
            type: 'string'
        },
    }
}
