<template>
    <div>
        <p class="text-3xl">{{ $t('users.trainers') }}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewTrainer"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :onView="viewTrainerInfo"
                :onEdit="editTrainer" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="trainers_list">
            </custom-data-table>
        </div>

        <TrainerFormModal v-if="show_trainer_form" :admin_group_id="admin_group_id" :branches="branches" :selected_trainer="selected_trainer_info" @close-modal="show_trainer_form = false"/>
        <TrainerDetailsModal v-if="show_details_form" :trainer="trainer_info" @close-modal="show_details_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TrainerFormModal from './TrainerFormModal.vue';
import TrainerDetailsModal from './TrainerDetailsModal.vue';

export default {
    components: { TrainerFormModal, TrainerDetailsModal },
    data() {
        return {
            admin_group_id: 9,
            show_trainer_form: false,
            show_details_form: false,
            search_fields: ["name", "email", "mobile"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('master.image'), attribute: "image", field: "image", sortable: false },
                { name: this.$t('datatable.name'), attribute: "name", sortable: false },
                { name: this.$t('datatable.email'), attribute: "email", sortable: false },
                { name: this.$t('datatable.mobile'), attribute: "mobile", sortable: false },
                { name: this.$t('datatable.is_active'), attribute: "is_active", sortable: false  },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            trainers_list: [],
            branches: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["trainers", "trainersToast", "updateTrainerResponse"]),
    },
    methods: {
        ...mapActions(["getTrainers", "updateTrainer", "deleteTrainer"]),

        viewTrainerInfo(id, data) {
            this.$router.push('/lesson-configurations/' + data.id)
        },
        onAddNewTrainer() {
            this.$router.push('/trainers/add')
        },
        showPopup(type, data) {
            if(type == "add"){
                this.selected_trainer_info = "";
                this.show_trainer_form = true;
            } else if(type == "edit"){
                this.selected_trainer_info = data;
                this.show_trainer_form = true;
            }
        },
        closePopup() {
            this.show_trainer_form = false;
        },
        editTrainer(id, data) {
            this.showPopup('edit', data);
        },
        deleteTrainers(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteTrainer(id);
            }
        },
        onCheck(event, id, data){
            let branch_ids = []

            data.branches.forEach(branch => {
                branch_ids.push(branch.id);
            });
            this.updateTrainer({
                id: id,
                trainer: {
                    is_active: event.target.checked ? 1 : 0,
                    type: "status",
                },
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Trainers")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_trainer")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_trainer")
            this.has_delete_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "delete_trainer")
        }
    },
    watch: {
        trainers(data) {
            if(data != null) {
                this.trainers_list = data.trainers
                this.branches = data.branches
                this.trainers_list.forEach(trainer => {
                    trainer.is_active = trainer.is_active == 0 ? false : true
                });
            }
        },
        trainersToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateTrainerResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getTrainers()
    },
}
</script>