<template>
    <h2 class="ms-2">USER <small style="font-size: 15px;"><em> ~ Kelola User</em></small></h2>
    <div class="text-end">
        <button type="button" class="btn btn-primary btn-sm ms-auto" data-bs-toggle="form-modal"
            data-bs-target="#formmodal" @click="editItem">
            Tambah Data
        </button>

    </div>
    <div ref="formmodal" class="modal fade modal" id="formmodal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah data Penduduk</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <b-form @submit="saveData">
                        <div class="container-fluid mt-2">
                            <b-form-group label="Nama">
                                <b-form-input id="name" class="form-control form-control-sm" v-model="form.name"
                                    required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Email">
                                <b-form-input id="email" type="email" class="form-control form-control-sm"
                                    v-model="form.email" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="Kelompok">
                                <b-form-select v-model="form.group_id" size="sm" class="mb-3" required>
                                    <b-form-select-option value="">-- Semua --</b-form-select-option>
                                    <b-form-select-option v-for="group in grup" :key="group.group_id"
                                        :value="group.group_id">
                                        {{ group.name }}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                            <b-form-group label="Rt">
                                <b-form-input id="rt" class="form-control form-control-sm"
                                    v-model="form.rt"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Rw">
                                <b-form-input id="rw" class="form-control form-control-sm"
                                    v-model="form.rw"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Password">
                                <b-form-input id="password" type="password" class="form-control form-control-sm"
                                    v-model="form.password" required></b-form-input>
                            </b-form-group>

                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-secondary btn-sm m-1"
                                data-bs-dismiss="modal">Batal</button>
                            <b-button type="submit" v-model="saveData" class="btn btn-success btn-sm m-1" size="sm">
                                Simpan</b-button>
                        </div>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
    <div class=" p-4 shadow-sm bg-white border-radius-xl">
        <div :class="{ 'blur-effect': loading }">
            <b-table class="border mt-3" responsive style="font-size: 12px;" hover :items="filteredItems"
                :fields="fields" :per-page="perPage" :current-page="currentPage" @change-page="handlePageChange">
                <template #cell(actions)="row">
                    <b-button size="sm" class="mx-1 btn-warning" @click="editItem(row.item)">Edit</b-button>
                    <b-button size="sm" class="mx-1 btn-danger" @click="deleteData(row.item)">Hapus</b-button>
                </template>
            </b-table>
        </div>
        <p class="mt-3" style="font-size: 13px;">Page <b>{{ currentPage }}</b> <br>menampilkan <b>{{ perPage }}</b> dari
            <b>{{ totalRows }}</b>
        </p>
        <div class="text-end d-flex justify-content-end">
            <b-pagination class="text-end" v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                v-if="!loading" aria-controls="my-table"></b-pagination>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'Keluarga',
    data() {
        return {
            url: 'http://127.0.0.1:8000/foto_penduduk/',
            form: {
                name: '',
                email: '',
                password: '',
                group_id: '',
                rt: '',
                rw: '',
            },
            genderOptions: [
                { value: 'Laki-Laki', text: 'Laki-Laki' },
                { value: 'Wanita', text: 'Wanita' }
            ],
            items: [],
            grup: [],
            fields: [
                { key: 'name', label: 'Nama' },
                { key: 'email', label: 'Email' },
                { key: 'nama_grup', label: 'Kelompok' },
                { key: 'rt', label: 'rt' },
                { key: 'rw', label: 'rw' },
                { key: 'actions', label: 'Aksi', class: 'text-center' }
            ],
            perPage: 15, // Number of items per page
            currentPage: 1, // Current page number
            loading: true,
            searchQuery: "",
            previewImage: ''
        }
    },
    computed: {
        paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.items.slice(start, end);
        },
        totalRows() {
            return this.items.length; // Total number of filtered items
        },
        filteredItems() {
            let keyword = this.searchQuery.toLowerCase();
            return this.items.filter(item => {
                return (
                    item.name.toLowerCase().includes(keyword)
                );
            });
        },
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.group_id !== 1) {
            this.$router.push('/dashboard');
        }
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.loading = true;
            // let token = localStorage.getItem("token");
            this.$store.dispatch("getData", {
                url: `api/users`,
            })
                .then((response) => {
                    setTimeout(() => {
                        this.items = response.data.data;
                        this.grup = response.data.grup;
                        this.loading = false;
                    }, 1000);
                })
                .catch((error) => {
                    alert(error);
                    this.loading = false; // Ensure loading is set to false even if an error occurs
                });
        },
        modal(item) {
            this.form = item
            this.form = {
                name: '',
                email: '',
                password: '',
                group_id: '',
                rt: '',
                rw: '',
            };
            this.formModal.show();
        },
        saveData() {
            this.$store.dispatch("postData", {
                url: `api/users`,
                params: this.form
            }).then((response) => {
                this.message = JSON.stringify(response.data.message)
                this.fetchData()
                console.log(response.data.status)
                if (response.data.status == 'success' || response.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => { })
                    this.formModal.hide();
                } else {
                    this.errorMessage = response.data.message
                    Swal.fire({
                        title: 'Error Validation',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(() => {
                    })
                    this.showDismissibleAlert = true
                }
                this.loading = false
            }).catch((e) => {
                Swal.fire({
                    title: 'Error',
                    text: e.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                this.loading = false
            })
            this.formModal.show();
        },
        editItem(item) {
            this.form = item

            let modal = document.getElementById('formmodal');
            let bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        },
        deleteData(item) {
            this.$swal
                .fire({
                    title: 'Hapus data',
                    text: 'Yakin ingin menghapus data ini?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.$store
                            .dispatch('deleteData', {
                                url: `api/users/${item.id}`
                            })
                            .then((response) => {
                                this.fetchData()
                                this.$swal
                                    .fire({
                                        title: 'Success',
                                        text: response.data.message,
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    })
                                    .then(() => {
                                        this.loading = false
                                    })
                            })
                            .catch((e) => {
                                this.$swal.fire({
                                    title: 'Error',
                                    text: 'Ada kesalahan pada server',
                                    icon: 'error',
                                    confirmButtonText: 'OK'
                                })
                                this.loading = false
                            })
                    }
                })
        },
        handlePageChange(page) {
            this.currentPage = page; // Update current page
        },
        search() {
            console.log('Search Query:', this.searchQuery);
        }
    }
}
</script>

<style>
.blur-effect {
    filter: blur(5px);
    transition: filter 0.5s ease;
    /* Adjust the transition duration as needed */
}

.bg-table {
    background-color: #75baff;
}
</style>
