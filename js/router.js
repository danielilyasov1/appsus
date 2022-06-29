import homePage from './views/home-page.cmp.js'
import keepPage from '../app/keep/js/keep.cmp.js'
import emailPage from '../app/email/js/email.cmp.js'

const aboutTeam = {
  template: `
        <section class="about-team">
            <h2>About Our Team</h2>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum cum nam voluptas iste nulla, dolorum blanditiis! Dolorem, rerum libero! Nihil, corrupti rem! Dolorem rem explicabo pariatur nihil quae laboriosam!
            </p>
        </section>
    `,
}
const aboutService = {
  template: `
        <section class="about-service">
            <h2>Top Services</h2>
            <p>
            Services bla Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum cum nam voluptas iste nulla, dolorum blanditiis! Dolorem, rerum libero! Nihil, corrupti rem! Dolorem rem explicabo pariatur nihil quae laboriosam!
            </p>
        </section>
    `,
}

const routes = [
  {
    path: '/',
    component: homePage,
    children: [
      {
        path: 'team',
        component: aboutTeam,
      },
      {
        path: 'service',
        component: aboutService,
      },
    ],
  },
//   {
//     path: '/book',
//     component: bookPage,
//   },
  {
    path: '/keep',
    component: keepPage,
  },
  {
    path: '/email',
    component: emailPage,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
