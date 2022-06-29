import homePage from "./views/home-page.cmp.js"
import keepPage from "../app/keep/js/keep.cmp.js"
import emailPage from "../app/email/js/email.cmp.js"
import bookApp from "../app/book/js/views/book-app.cmp.js"
import bookDetails from "../app/book/js/views/book-details.cmp.js"
import bookAdd from "../app/book/js/views/book-add.cmp.js"
import emailDetails from "../app/email/js/views/email-details.cmp.js"

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/book",
    component: bookApp,
  },
  {
    path: "/book/:bookId",
    component: bookDetails,
  },
  {
    path: "/book/add/:bookId?",
    component: bookAdd,
  },
  {
    path: "/keep",
    component: keepPage,
  },
  {
    path: "/email",
    component: emailPage,
  },
  {
    path: "/email/:emailId",
    component: emailDetails,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
