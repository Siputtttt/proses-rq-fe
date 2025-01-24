<template>
    <div class="text-end">
        <button type="button" class="btn btn-primary btn-sm ms-auto" data-bs-toggle="form-modal"
            data-bs-target="#formmodal" @click="editItem">
            Add Data
        </button>
    </div>
    <div ref="formmodal" class="modal fade" id="formmodal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Form Categories</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <b-form>
                        <b-form-group id="input-group-1" label="Name Category :" label-for="input-name">
                            <b-form-input id="input-name" v-model="form.name" placeholder="Input Name Category"
                                required></b-form-input>
                        </b-form-group>
                    </b-form>
                    <hr />
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary btn-sm m-1"
                            data-bs-dismiss="modal">cancel</button>
                        <b-button type="button" class="btn btn-success btn-sm m-1" data-bs-dismiss="modal" size="sm"
                            @click="saveData()">Save</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="p-4 shadow-sm bg-white border-radius-xl">
        <b-row>
            <b-col cols="3" class="ms-auto">
                <label>Search : </label>
                <b-form-input @input="onSearchInput" v-model="searchQuery" size="sm" placeholder="Cari..."
                    class="mb-3"></b-form-input>
            </b-col>
        </b-row>

        <div :class="{ 'blur-effect': loading }">
            <b-table class="border mt-3" responsive style="font-size: 12px;" striped hover :items="categories.data"
                :fields="fields">
                <template #cell(id)="row">
                    {{ row.index + 1 }}
                </template>
                <template #cell(actions)="row">
                    <b-button size="sm" variant="warning" class="me-2" @click="editItem(row.item)">Edit</b-button>
                    <b-button size="sm" variant="danger" @click="deleteData(row.item)">Delete</b-button>
                </template>
            </b-table>
            <p class="text-muted">
                Page <b>{{ pagination.current_page }}</b> of <b>{{ pagination.last_page }}</b> |
                Showing <b>{{ pagination.per_page }}</b> data per page from <b>{{ pagination.total }}</b>
                categories.
            </p>

            <b-pagination v-model="pagination.current_page" :total-rows="pagination.total"
                :per-page="pagination.per_page" align="right">
                <template #page="{ page, active }">
                    <b-pagination-page :active="active" @click="handlePageClick(page)">
                        {{ page }}
                    </b-pagination-page>
                </template>
            </b-pagination>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'Categories',
    data() {
        return {
            items: [],
            categories: [],
            fields: [
                { key: 'id', label: 'No', size: '5%', sortable: false, class: 'text-center' },
                { key: 'name', label: 'Name Categories', sortable: true, class: 'text - center' },
                { key: "actions", label: "Actions", sortable: false, class: "text-center" },
            ],
            loading: true,
            searchQuery: "",
            pagination: {
                current_page: 1,
                per_page: 10,
                last_page: 1,
                total: 0,
            },
            form: {
                id: "",
                name: "",
            }
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        onSearchInput() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.fetchData();
            }, 2000);
        },
        fetchData() {
            const page = this.pagination.current_page;
            this.loading = true;
            this.$store.dispatch("getData", {
                url: `api/categories?page=${page}&n=${this.searchQuery}`,
            })
                .then((response) => {
                    this.items = response.data.data;
                    this.categories = this.items.categories;
                    this.pagination = {
                        current_page: this.categories.current_page,
                        per_page: this.categories.per_page,
                        last_page: this.categories.last_page,
                        total: this.categories.total,
                    };
                    this.loading = false;
                })
                .catch((error) => {
                    alert(error);
                    this.loading = false;
                });
        },
        handlePageClick(page) {
            this.pagination.current_page = page;
            this.fetchData();
        },
        saveData() {
            if (this.form.name) {
                this.form = {
                    id: this.form.id,
                    name: this.form.name,
                    action_task: 'save_data'
                }
                this.loading = true;
                this.$store.dispatch("postData", {
                    url: `api/categories`,
                    params: this.form
                }).then(response => {
                    this.message = JSON.stringify(response.data.message);
                    this.fetchData();
                    if (response.data.status = true) {
                        Swal.fire({
                            title: 'Success',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Swal.fire({
                            title: 'Error Validation',
                            text: response.data.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                    this.loading = false;
                }).catch(e => {
                    Swal.fire({
                        title: 'Error',
                        text: e.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    this.loading = false;
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Name Categories Required',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        },
        editItem(item) {
            this.form = { ...item };
            let modal = document.getElementById('formmodal');
            let bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        },
        deleteData(form) {
            this.form = {
                id: form.id,
                action_task: 'delete_data'
            }
            Swal.fire({
                title: 'Delete data',
                text: "Are you sure want to delete this data?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch("postData", {
                        url: `api/categories`,
                        params: this.form
                    }).then(response => {
                        this.fetchData();
                        Swal.fire({
                            title: 'Success',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }).catch(e => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Erro delete data',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
                }
            });
        },
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
