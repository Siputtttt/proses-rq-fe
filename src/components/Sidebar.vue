<template>
    <aside
        class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 shadow bg-sidebar"
        id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html "
                target="_blank">
                <!-- <img :src="url ('/assets/img/logo-ct-dark.png')" class="navbar-brand-img h-100" alt="main_logo"> -->
                <!-- <img :src="url ('/assets/img/logo-ct.png')" class="navbar-brand-img h-100" alt="main_logo"> -->
                <span class="ms-1 font-weight-bold text-light">Full Stack MP</span>
            </a>
        </div>
        <hr class="horizontal dark mt-0">
        <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav text-light">
                <div v-for="item in sidebar" :key="item.title">
                    <li v-if="item.type === 'header'" class="nav-item mt-3">
                        <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">{{ item.title }}
                        </h6>
                    </li>
                    <li v-if="item.type === 'link'" class="nav-item">
                        <router-link
                            :class="'nav-link ' + (this.$route.path === item.route ? ' active text-dark' : '') + ' text-light'"
                            :to="item.route">
                            <span class="nav-link-text ms-1">
                                <div class="row">
                                    <div class="col-1">
                                        <!-- <i :class="item.icon"></i> -->
                                        <font-awesome-icon :icon="item.icon" class="me-2" />
                                    </div>
                                    <div class="col">
                                        {{ item.title }}
                                    </div>
                                </div>
                                <!-- <font-awesome-icon :icon="item.icon" class="me-2" /> {{ item.title }} -->
                            </span>
                        </router-link>
                    </li>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || {},
            sidebar: [
                { type: 'header', title: '', route: '', icon: '' },
                { type: 'link', title: 'Dashboard', route: '/dashboard', icon: 'fa-solid fa-chart-line' },
                { type: 'header', title: 'Module', route: '', icon: '' },
                { type: 'link', title: 'Category', route: '/categories', icon: 'fa-solid fa-chart-line' },
                { type: 'link', title: 'News', route: '/news', icon: 'fa-solid fa-chart-line' },
            ],
        }
    },
    methods: {
        logout() {
            // Hapus token autentikasi
            localStorage.removeItem('token');
            // Arahkan ke halaman login
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.active {
    background-color: #e9e9e9;
}
</style>