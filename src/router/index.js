import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import KArea from "../views/K-Area.vue";
import Taxonomia from "../views/Taxonomia.vue";
import KUnit from "../views/KUnit.vue";
import Research from "../views/Research.vue";
import WorkRoles from "../views/WorkRole.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Favorites from "../views/Favorites.vue";
import Publications from "../views/Publications.vue";
import AddPublication from "../views/AddPublication.vue";
import Publication from "../views/Publication.vue";
import MyPublications from "../views/MyPublications.vue";
import UpdatePublication from "../views/UpdatePublication.vue";
import PublicationsPending from "../views/PublicationsPending.vue";
import ResetPassword from "../views/ResetPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/publications",
    name: "Publications",
    component: Publications,
  },
  {
    path: "/publications-pending",
    name: "PublicationsPending",
    component: PublicationsPending,
  },
  {
    path: "/myPublications/:id",
    name: "MyPublications",
    component: MyPublications,
  },
  {
    path: "/addPublication",
    name: "AddPublication",
    component: AddPublication,
  },
  {
    path: "/updatePublication/:id",
    name: "UpdatePublication",
    component: UpdatePublication,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/karea",
    name: "KArea",
    component: KArea,
  },
  {
    path: "/:idKA/:idKU-:KUName",
    name: "KUnit",
    component: KUnit,
  },
  {
    path: "/:idKA/:idKU/:researchName-:sectorId",
    name: "Research",
    component: Research,
  },
  {
    path: "/:wrId-:wrName",
    name: "WorkRoles",
    component: WorkRoles,
  },
  {
    path: "/taxonomyChart",
    name: "Taxonomia",
    component: Taxonomia,
  },
  {
    path: "/publication/:idPublication",
    name: "Publication",
    component: Publication,
  },
];

const router = new VueRouter({
  routes,
  //mode: "history"
});

export default router;
