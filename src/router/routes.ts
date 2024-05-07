import { RouteRecordRaw } from 'vue-router'
import { UserLoginView, UserRegisterView } from '@/views/user/index.export'
import { NoAuthView } from '@/views/index.export'
import { UserLayout, BasicLayout } from '@/layouts/index.export'
import { AddQuestionView, ManageQuestionView, QuestionListView, QuestionView } from '@/views/question/index.export'
import { DiscussView } from '@/views/discuss/index.export'

import ACCESS_ENUM from '@/access/accessEnum'
import QuestionStatus from '@/views/question/quesionview/QuestionStatus.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户',
    component: UserLayout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/user/login',
        name: '用户登录',
        component: UserLoginView
      },
      {
        path: '/user/register',
        name: '用户注册',
        component: UserRegisterView
      }
    ]
  },
  {
    path: '/discuss',
    name: '讨论',
    component: DiscussView
  },
  {
    path: '/question/list',
    name: '题库',
    component: QuestionListView
  },
  {
    path: '/question/status',
    name: '提交状态',
    component: QuestionStatus
  },
  {
    path: '/view/question/:id',
    name: '在线做题',
    component: QuestionView,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: NoAuthView,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/question/create',
    name: '创建题目',
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/question/update',
    name: '修改题目',
    component: AddQuestionView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/question/manage',
    name: '题库管理',
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/question/view',
    name: '浏览题目',
    component: QuestionView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER
    }
  }
]

export default routes
