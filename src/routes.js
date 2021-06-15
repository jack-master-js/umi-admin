export default [
    {
        path: '/',
        component: '@/layouts/index',
        routes: [
            //dashboard
            { path: '/', redirect: '/dashboard', hide: true },
            {
                path: '/dashboard',
                component: './dashboard/index',
                hide: true,
            },
            {
                path: '/login',
                component: './login/index',
                hide: true,
            },

            //permission routes start
            {
                path: '/group',
                name: 'group',
                title: '第一组',
                icon: 'BugOutlined',
                routes: [
                    {
                        path: '/group/home',
                        component: './group/home',
                        name: 'home',
                        title: '首页',
                    },
                    {
                        path: '/group/about',
                        component: './group/about',
                        name: 'about',
                        title: '关于',
                    },
                ],
            },
        ],
    },
];
