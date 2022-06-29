import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
 <section class="about-page app-main">
    <h3>This is an about page</h3>
    <!-- <button @click="callBus">Call the Bus</button> -->
    <hr />
    <nav class='nav'>
        <router-link to="/about/team">Team</router-link> |
        <router-link to="/about/service">Services</router-link>
    </nav>
    <router-view class='about'/>
    <img src='img/book2.png' class='logo'>

 </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {
        callBus() {
            console.log('calling the bus');
            eventBus.emit('show-msg', 'hi')
        }
    },
    computed: {},
    unmounted() { },
};