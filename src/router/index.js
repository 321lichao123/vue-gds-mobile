import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '@/store'
import {Toast} from 'vant'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // {
        //     path: '/',
        //     redirect: '/trade',
        // },
        // {
        //     path: '/trade',
        //     name: 'trade',
        //     component: () => import('@/views/trade/trade.vue')
        // },
        // {
        //     path: '/userprofile',
        //     name: 'userprofile',
        //     component: () => import('@/views/newUserprofile/userprofile.vue')
        // },
        {
            path: '/login',
            name: 'login',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/login')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register')
        },
        // {
        //     path: '/search',
        //     name: 'search',
        //     meta: {
        //         requireAuth: false
        //     },
        //     component: () => import('@/views/search')
        // },
        // {
        //     path: '/article/:articleId',
        //     name: 'article',
        //     meta: {
        //         requireAuth: false
        //     },
        //     component: () => import('@/views/article'),
        //     props: true
        // },
        // {
        //     path: '/user/profile',
        //     name: 'userprofile',
        //     meta: {
        //         requireAuth: true
        //     },
        //     component: () => import('@/views/userprofile'),
        //     props: true
        // },
        // {
        //     path: '/userchat',
        //     name: 'userchat',
        //     meta: {
        //         requireAuth: false
        //     },
        //     component: () => import('@/views/userchat'),
        //     props: true
        // },
        // {
        //     path: '/usercollect',
        //     name: 'usercollect',
        //     meta: {
        //         requireAuth: true
        //     },
        //     component: () => import('@/views/usercollect'),
        //     props: true
        // },
        // {
        //     path: '/userhistory',
        //     name: 'userhistory',
        //     meta: {
        //         requireAuth: true
        //     },
        //     component: () => import('@/views/usercollect'),
        //     props: true
        // },
        {
            path: '/',
            meta: {
                requireAuth: false
            },
            component: () => import('@/views/layout'),
            children: [{
                    path: '', //默认子路由
                    component: () => import('@/views/trade/trade.vue')
                },
                {
                    path: '/notice',
                    meta: {
                        requireAuth: false
                    },
                    component: () => import('@/views/notice/notice.vue')
                },
                // {
                //     path: '/weather',
                //     meta: {
                //         requireAuth: false
                //     },
                //     component: () => import('@/views/weather')
                // },
                {
                    path: '/userprofile',
                    meta: {
                        requireAuth: false
                    },
                    component: () => import('@/views/newUserprofile/userprofile')
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.user) {
            next();
        } else {
            Toast('请登录后访问')
        }
    } else {
        next();
    }
})


export default router;