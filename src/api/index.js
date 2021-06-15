import request from '@/utils/fetcher';

// const host = `http://localhost:3000`;
const host = ``;

export const getUsers = data => {
    return request(`${host}/api/users`, data);
};
