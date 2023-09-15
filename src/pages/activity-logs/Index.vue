<template>
    <div>
        <h2 class="mb-6 text-2xl">{{ $t('activity_log.title') }}</h2>

        <div class="accordion" id="accordionExample">
            <div class="accordion-item border-t-0 border-l-0 border-r-0 rounded-none bg-white border border-gray-200">
                <h2 class="accordion-header mb-0" id="flush-headingOne">
                    <button class="accordion-button relative flex items-center w-full py-4 px-5 
                        text-base font-medium text-gray-800 text-left bg-white 
                        border-0 rounded-none transition focus:outline-none" 
                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                        aria-expanded="false" aria-controls="flush-collapseOne">
                        {{ $t('activity_log.filters') }}
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse border-0 collapse show"
                    aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body py-4 px-5">
                        <div class="grid grid-cols-4 gap-4">

                            <div class="w-full">
                                <label>{{ $t('activity_log.select_date') }}</label>
                                <select @change="onFiltersOptionChaned($event)" v-model="selected_filter" class="w-full rounded-md border text-gray-700 h-10 text-gray-700 text-sm">
                                    <option value="today">{{ $t('activity_log.today') }}</option>
                                    <option value="this_week">{{ $t('activity_log.this_week') }}</option>
                                    <option value="custom_date">{{ $t('activity_log.custom_date') }}</option>
                                </select>
                            </div>

                            <div class="w-full">
                                <label>{{ $t('activity_log.start_date') }}</label>
                                <date-picker 
                                    v-model="start_date" 
                                    :format="'dd/MM/yyyy'" 
                                    :enableTimePicker="false" 
                                    :monthChangeOnScroll="false"
                                    placeholder="Choose start date" 
                                    class="w-full rounded-md border text-gray-700 h-10 text-gray-700 text-md"
                                />
                            </div>

                            <div class="w-full">
                                <label>{{ $t('activity_log.end_date') }}</label>
                                <date-picker
                                    v-model="end_date"
                                    :format="'dd/MM/yyyy'"
                                    :enableTimePicker="false"
                                    :monthChangeOnScroll="false"
                                    placeholder="Choose end date"
                                    class="w-full rounded-md border text-gray-700 h-10 text-gray-700"
                                />
                            </div>

                            <div class="w-full overflow-hidden flex justify-end">
                                <div class="w-full flex h-full float-right flex justify-end">
                                    <button @click="applyFilters" class="btn-primary rounded px-2 mx-1 h-10 py-1 mt-auto text-sm">
                                        {{ $t('activity_log.apply_filters') }}
                                    </button>
                                    <button @click="clearFilters" class="btn-primary-outline rounded px-2 mx-1 h-10 py-1 mt-auto text-sm">
                                        {{ $t('activity_log.clear_filters') }}
                                    </button>
                                </div>
                            </div>

                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 mb-5 pb-8">
            <custom-data-table
                :serverSidePagination="true"
                :apiResponse="main_response"
                :onPageChanged="onPageChanged"
                :onPerPageOptionChange="onPerPageOptionChange"
                :onSearchData="onSearchData"
                :onSortData="onSortData"
                :customPageSize="10"
                :enableHeader="true"
                :searchBox="true"
                :searchFields="null"
                :searchInNestedObject="false"
                :isAddNew="false"
                :columns="columns" 
                :view="false" 
                :edit="false" 
                :del="false"
                :hasCustomAction="true"
                :customActionBtnText="$t('datatable.view_details')"
                :onCustomActionClicked='viewLogDetails' 
                :hasActionButtonLayoutStyle="true"
                :actionButtonLayoutStyle="'justify-center'"
                :rows="activity_logs">
                    <template #custom-component>
                        <div class="flex ml-auto">
                            <button type="button" @click="downloadPDF" class="bg-green-900 text-white text-xs 
                                py-2.5 font-semibold px-2 uppercase rounded my-auto" 
                                :class="activity_logs.length <= 0 ? 'btn-disabled' : ''">{{ $t('activity_log.download_pdf') }}</button>
                            <button type="button" @click="downloadCSV" class="bg-green-900 text-white text-xs font-semibold
                                px-2 ml-3 uppercase rounded text-center py-2.5 my-auto" 
                                :class="activity_logs.length <= 0 ? 'btn-disabled' : ''">{{ $t('activity_log.download_csv') }}</button>
                        </div>
                    </template>
            </custom-data-table>
        </div>


    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import moment from 'moment'
import downloadCsv from 'download-csv';

export default {
    data() {
        return {
            selected_filter: 'today',
            start_date: new Date(),
            end_date: new Date(),
            has_view_permission: false,
            timeout: null,
            CSV_file_column_titles: {
                email: "Email",
                user_role: "Role",
                action: "Action",
                section: "Section",
                created_at: "Time Stamp",
                details: "Details"
            },
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.user_name'), attribute: "user_name", sortable: false },
                { name: this.$t('datatable.email'), attribute: "user_email", sortable: false },
                { name: this.$t('datatable.action_performed'), attribute: "performed_action", sortable: false  },
                { name: this.$t('datatable.section'), attribute: "section", sortable: false  },
                { name: this.$t('datatable.ip_address'), attribute: "ip_address", sortable: false },
                { name: this.$t('datatable.date_n_time'), attribute: "created_at", sortable: true, formatDate: false, dateFormat:'NONE' },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false, colHeadStyle: "text-center"  },
            ],
            activity_logs: [],
            search_key: '',
            sort_col: '',
            sort_order: '',
            download_type: 'CSV'
        };
    },
    computed: {
        ...mapGetters(["activityLogs", "downloadActivityLogResponse"]),

        main_response() {
            return this.activityLogs?.response
        }
    },
    methods: {
        ...mapActions(["getActivityLogs", "downloadActivityLogs"]),

        onFiltersOptionChaned(event) {
            if(event.target.value == 'today') {
                this.start_date = this.end_date = new Date()
            } else if(event.target.value == 'this_week') {
                this.start_date = moment().startOf('week').toDate();
                this.end_date = moment().endOf('week').toDate();
            } else {
                this.start_date = this.end_date = ''
            }
        },

        applyFilters(page_number = 1, page_size = 10, search_keyword = '', sort_type = '', sort_column  = '') {
            this.search_key = search_keyword
            this.sort_col = sort_column
            this.sort_order = sort_type
            this.getActivityLogs({
                page: page_number,
                per_page: page_size,
                search: search_keyword,
                sort_column: sort_column,
                sort_type: sort_type,
                created_at_start: this.start_date ? moment(String(this.start_date)).format('YYYY-MM-DD').concat(" 00:00:00") : '',
                created_at_end: this.end_date ? moment(String(this.end_date)).format('YYYY-MM-DD').concat(" 00:00:00") : ''
            })
        },

        clearFilters() {
            this.start_date = this.end_date = new Date()
            this.selected_filter = 'today'
            this.applyFilters()
        },

        onPageChanged(page_number, page_size, search_keyword, sort_type, sort_column) {
            this.applyFilters(page_number, page_size, search_keyword, sort_type, sort_column);
        },

        onPerPageOptionChange(event, search_keyword, sort_type, sort_column) {
            this.applyFilters(1, event.target.value, search_keyword, sort_type, sort_column);
        },

        onSearchData(page_size, search_keyword) {
            let context = this;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () {
                context.applyFilters(1, page_size, search_keyword, '', '');
            }, 1200);
        },

        onSortData(page_size, search_keyword, sort_type, sort_column) {
            this.applyFilters(1, page_size, search_keyword, sort_type, sort_column);
        },

        downloadPDF() {
            this.download_type = "PDF"
            this.downloadActivityLogs({
                type: 'download',
                search: this.search_key,
                sort_column: this.sort_col,
                sort_type: this.sort_order,
                created_at_start: this.start_date ? moment(String(this.start_date)).format('YYYY-MM-DD').concat(" 00:00:00") : '',
                created_at_end: this.end_date ? moment(String(this.end_date)).format('YYYY-MM-DD').concat(" 00:00:00") : ''
            })
        },

        downloadCSV() {
            this.download_type = "CSV"
            this.downloadActivityLogs({
                type: 'download',
                search: this.search_key,
                sort_column: this.sort_col,
                sort_type: this.sort_order,
                created_at_start: this.start_date ? moment(String(this.start_date)).format('YYYY-MM-DD').concat(" 00:00:00") : '',
                created_at_end: this.end_date ? moment(String(this.end_date)).format('YYYY-MM-DD').concat(" 00:00:00") : ''
            })
        },

        downloadLogsCSV() {
            downloadCsv(this.getFormattedCSVData(), this.CSV_file_column_titles, 'activity-logs.csv');
        },

        downloadLogsPDF() {
            const doc = new jsPDF()
            autoTable(doc, {
                head: [['Email', 'Role', 'Action', 'Section', "Time Stamp", 'Details']],
                body: this.getFormattedPDFData()
            })

            doc.save('activity-log.pdf')
        },

        getFormattedPDFData() {
            const formatted_array = []
            this.formatDownloadData(this.downloadActivityLogResponse.response).forEach(log => {
                let obj = [ 
                    log.user_email, 
                    log.role, log.performed_action, 
                    log.section, log.created_at, 
                    JSON.parse(log.details).description 
                ]
                formatted_array.push(obj)
            });
            return formatted_array
        },

        getFormattedCSVData() {
            const formatted_array = []
            this.formatDownloadData(this.downloadActivityLogResponse.response).forEach(log => {
                let obj = { 
                    "email" : log.user_email, 
                    "user_role": log.role, 
                    "action": log.performed_action, 
                    "section": log.section,  
                    "created_at": log.created_at,
                    "details": JSON.parse(log.details).description
                }
                formatted_array.push(obj)
            });
            return formatted_array
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Activity Logs")
            this.has_view_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "activity_log_details")
        },

        viewLogDetails(id) {
            this.$router.push('/activity-logs/' + id)
        },

        formatData(response) {
            this.activity_logs = []
            if(response.data.length > 0) {
                response.data.forEach(log => {
                    let obj = { 
                        "id": log.id,
                        "user_name": log.user.name,
                        "user_email": log.user.email,
                        "performed_action": log.action,
                        "role": log.admin_group.title,
                        "section": log.admin_menu.title,
                        "created_at": log.created_at,
                        "ip_address": log.ip_address,
                        "user_agent": log.user_agent,
                        "details": log.details
                    }
                    this.activity_logs.push(obj)
                });
            }
        },

        formatDownloadData(data){
            let formatted_data = []
            if(data.length > 0) {
                data.forEach(log => {
                    let obj = { 
                        "id": log.id,
                        "user_name": log.user.name,
                        "user_email": log.user.email,
                        "performed_action": log.action,
                        "role": log.admin_group.title,
                        "section": log.admin_menu.title,
                        "created_at": log.created_at,
                        "ip_address": log.ip_address,
                        "user_agent": log.user_agent,
                        "details": log.details
                    }
                    formatted_data.push(obj)
                });
                return formatted_data
            }
        }
    },
    watch: {
        activityLogs(data) {
            if(data.status) {
                this.main_response = data.respone
                this.formatData(data.response)
            } else {
                this.$toast.error(data.message);
            }
        },
        downloadActivityLogResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
                if(this.download_type == "PDF") {
                    this.downloadLogsPDF()
                } else {
                    this.downloadLogsCSV()
                }
            } else {
                this.$toast.error(data.message);
            }
      }
    },
    mounted() {
        this.checkPermissions()
        this.applyFilters(1, import.meta.env.VITE_APP_DEFAULT_TABLE_ROWS)
    },
};
</script>

<style scoped>
.accordion-button:not(.collapsed) {
    color: var(--primary-color) !important;
}
</style>