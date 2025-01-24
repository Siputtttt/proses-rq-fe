<template>
    <b-row class="mb-4">
        <b-col cols="3" class="ms-auto">
            <label>Date: </label>
            <select id="categorySelect" v-model="dateSelected" class="form-select form-select-sm"
                aria-label="Select category">
                <option value="">All</option>
                <option v-for="d in date" :key="d.DATE" :value="d.DATE">
                    {{ d.DATE }}
                </option>
            </select>
        </b-col>
    </b-row>
    <div class="row" :class="{ 'blur-effect': loading }">
        <div class="col-sm-4" style="height: 500px;">
            <highcharts :options="chartCategory"></highcharts>
        </div>
        <div class="col-sm-8" style="height: 500px;">
            <highcharts :options="chartAgregasiWritte"></highcharts>
        </div>
        <div class="col-sm-8" style="height: 500px;">
            <highcharts :options="chartAgregasiDate"></highcharts>
        </div>
    </div>
</template>

<script>
import { Highcharts } from "highcharts-vue";

export default {
    components: {
        highcharts: Highcharts
    },
    data() {
        return {
            loading: false,
            items: [],
            itemsk: [],
            category: [],
            date: [],
            writter: [],
            dateSelected: "",
            chartCategory: {
                chart: {
                    type: "pie"
                },
                title: {
                    text: `Amount of categories`
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return `<b>${this.point.name}</b>: ${this.y}`;
                            }
                        }
                    }
                },
                series: [{
                    name: "Mount of categories",
                    data: []
                }]
            },
            chartAgregasiDate: {
                chart: {
                    type: "column"
                },
                title: {
                    text: "Aggregation by date"
                },
                xAxis: {
                    categories: [], // Tanggal akan diisi dari API
                    title: {
                        text: "Date"
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Amount Data"
                    }
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y;
                            }
                        }
                    }
                },
                series: [
                    {
                        name: "Amount Data",
                        data: []
                    }
                ]
            },
            chartAgregasiWritte: {
                chart: {
                    type: "column"
                },
                title: {
                    text: "Aggregation by writter"
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: "Writter"
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Amount Data"
                    }
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y;
                            }
                        }
                    }
                },
                series: [
                    {
                        name: "Amount Data",
                        data: []
                    }
                ]
            },
        };
    },
    watch: {
        dateSelected(newValue) {
            this.dateSelected = newValue;
            this.fetchData();
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.loading = true;
            this.$store.dispatch("getData", {
                url: `api/dashboard?t=${this.dateSelected}`,
            }).then((response) => {
                const data = response.data.data;

                this.chartCategory.series[0].data = data.total_categegory.map((item) => ({
                    name: item.category,
                    y: item.total_category
                }));

                this.date = data.total_date;
                this.chartAgregasiDate.xAxis.categories = this.date.map((item) => item.DATE);
                this.chartAgregasiDate.series[0].data = this.date.map((item) => item.total_date);

                this.writter = data.total_writter;
                this.chartAgregasiWritte.xAxis.categories = this.writter.map((item) => item.writer);
                this.chartAgregasiWritte.series[0].data = this.writter.map((item) => item.total_writer);

                this.loading = false;
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        },
    },
};
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