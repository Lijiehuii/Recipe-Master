import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "../views/HomeView/HomeView";
import ClassificationView from "../views/ClassificationView/ClassificationView";
import CollectionView from "../views/CollectionView/CollectionView";
import MineView from "../views/MineView/MineView";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/classification',
    name: 'classification',
    component: ClassificationView
  },
  {
    path: '/collection',
    name: 'collection',
    component: CollectionView
  },
  {
    path: '/mine',
    name: 'mine',
    component: MineView
  },
  {
    path: '/:route/search',
    name: 'search',
    component: () => import("@/views/SearchView/SearchView.vue")
  },
  {
    path: '/:route/userinfo',
    name: 'userinfo',
    component: () => import("@/views/UserInfoView/UserInfoView")
  },
  {
    path: "/home/activity",
    name: "activity",
    component: () => import("@/views/ActivityView/ActivityView")
  },
  {
    path: "/home/share",
    name: "share",
    component: () => import("@/views/ShareView/ShareView.vue")
  },
  {
    path: "/:route/recipe",
    name: "recipe",
    component: () => import("@/views/RecipeDetilView/RecipeDetilView.vue")
  },
  {
    path: "/:route/note",
    name: "note",
    component: () => import("@/views/NoteDetilView/NoteDetilView.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView/LoginView.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
