export const enum QueryKeys {
    User = 'User',
    Household = 'Household',
    Plot = 'Plot',
    ObjectTypes = 'objectTypes',
    Session = 'session',
}

export const Queries = {
    users: {
        key: QueryKeys.User,
        list: '/users/list',
        create: '/users/create',
        edit: (id: number) => `/users/edit/${id}`,
        listApi: '/api/users/list',
        upsertApi: '/api/users/upsert',
    },
};
