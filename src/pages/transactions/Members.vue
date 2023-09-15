<template>
    <div>
        <p class="text-3xl">{{$t('transactions.members')}}</p>
        <hr class="mb-5" />
        
        <div class="mt-8">
            <custom-data-table
                :enableHeader="true"
                :searchBox="true"
                :searchFields="search_fields"
                :isAddNew="has_add_permission"
                :addBtnText="$t('datatable.add_new')"
                :onAddBtnClicked="onAddNewMember"
                :columns="columns" 
                :view="true" 
                :edit="has_edit_permission" 
                :del="has_delete_permission" 
                :onView="viewMemberInfo"
                :onEdit="editMember" 
                :onDelete="deleteMembers" 
                :quickAction="has_edit_permission" 
                :onQuickActionPerformed="onCheck" 
                :rows="members_list">
            </custom-data-table>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            search_fields: ["code", "name_en", "mobile", "civil_id", "remark"],
            columns: [
                { name: "#", attribute: "#", sortable: false },
                { name: this.$t('datatable.code'), attribute: "code", sortable: false },
                { name: this.$t('datatable.name'), attribute: "name_en", sortable: false },
                { name: this.$t('datatable.mobile'), attribute: "mobile", sortable: false },
                { name: this.$t('datatable.civil_id'), attribute: "civil_id", sortable: false },
                { name: this.$t('datatable.remark'), attribute: "remark", sortable: false },
                { name: this.$t('datatable.action'), attribute: "action", sortable: false  }
            ],
            members_list: [],
            has_add_permission: false,
            has_edit_permission: false,
            has_delete_permission: false
        }
    },
    computed:{
        ...mapGetters(["members", "membersToast", "updateMemberResponse"]),
    },
    methods: {
        ...mapActions(["getMembers", "updateMember", "deleteMember"]),

        viewMemberInfo(id, data) {
            this.$router.push('/member-subscriptions/' + data.id)
        },
        onAddNewMember() {
            this.$router.push('/members/add')
        },
        editMember(id, data) {
            this.$router.push('/members/'+data.id)
        },
        deleteMembers(id){
            if (confirm(this.$t('datatable.are_you_sure'))) {
                this.deleteMember(id);
            }
        },
        onCheck(event, id, data){
            this.updateMember({
                id: data.id,
                civil_id: data.civil_id,
                passport: data.passport,
                mobile: data.mobile,
                alt_mobile: data.alt_mobile,
                civil_id_expiry: data.civil_id_expiry,
                code: data.code,
                ref_code: data.ref_code,
                name_en: data.name_en,
                name_ar: data.name_ar,
                gender: data.gender,
                birth_date: data.birth_date,
                age: data.age,
                email: data.email,
                address: data.address,
                area_id: data.area_id,
                country_id: data.country_id,
                blacklisted: data.blacklisted,
                black_listed_till: data.black_listed_till,
                company_name: data.company_name,
                company_type: data.company_type,
                remark: data.remark,
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Members")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_member")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_member")
            this.has_delete_permission = false//this.$root.getPermissionStatus(page_permissions?.permissions, "delete_member")
        }
    },
    watch: {
        members(data) {
            if(data != null) {
                this.members_list = data.members
            }
        },
        membersToast(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        },
        updateMemberResponse(data) {
            if(data.status) {
                this.$toast.success(data.message)
            } else {
                this.$toast.error(data.message)
            }
        }
    },
    mounted() {
        this.checkPermissions()
        this.getMembers()
    },
}
</script>