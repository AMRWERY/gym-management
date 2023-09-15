<template>
    <div>
        <p class="text-3xl">{{ $t('master.banners') }} <button @click="addBannerClicked" class="inline-block bg-primary float-right rounded-full px-3 pb-2 pt-3 text-sm font-semibold text-white mr-2 mb-1">{{$t('button.add_new_banner')}}</button>
        </p>
        <hr class="my-5" />
        
        <div class="grid grid-cols-4 gap-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="banner in bannersResponse" :key="banner.id">
                <img class="w-full h-32" :src="banner.image" :alt="'banner-'+banner.id">
                <div class="w-full  px-4 pt-4 pb-2 mt-auto">
                    <label class="switch">
                        <input type="checkbox" id="is_active" @change="onCheck($event, banner.id)" :checked="banner.is_active">
                        <span class="slider round"></span>
                    </label>
                    <!-- <span class="inline-block rounded-full px-3 pt-1 text-sm font-semibold text-gray-700 mr-2 mb-1" :class="banner.is_active ? 'bg-green-100' : 'bg-red-100'">{{ banner.is_active ? 'Active' : 'Inactive' }}</span> -->
                    <button @click="updateBannerClicked(banner.id)" class="inline-block bg-primary float-right rounded-full px-3 pt-1 text-sm font-semibold text-white mr-2 mb-1">{{$t('home.change')}}</button>
                </div>
            </div>
                                
        </div>

        <BannerFormModal v-if="show_banner_form" :modal_title="modalTitle" :selected_banner="selected_banner" @close-modal="show_banner_form = false"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BannerFormModal from './BannerFormModal.vue';

export default {
    components: { BannerFormModal },
    data() {
        return {
            show_banner_form: false,
            selected_banner: null,
            has_add_permission: false,
            has_edit_permission: false,

            modal_title: '',
            image_file: ''
        }
    },
    computed:{
        ...mapGetters(["bannersResponse", "bannersToast"]),
        modalTitle() {
            return this.selected_banner != null ? 'Edit Banner' : 'Add Banner'
        },
    },
    methods: {
        ...mapActions(["getBanners", "updateBanner"]),
        addBannerClicked() {
            this.selected_banner = null
            this.modal_title = 'Add Banner'
            this.show_banner_form = true;
        },
        updateBannerClicked(id) {
            this.selected_banner = this.bannersResponse.find(banner => banner.id == id)
            this.modal_title = 'Change Banner'
            this.show_banner_form = true;
        },
        closePopup() {
            this.show_banner_form = false;
        },
        onCheck(event, id){
            this.updateBanner({
                id: id, 
                form_data: {
                    is_active: event.target.checked ? 1 : 0
                }
            })
        },

        checkPermissions() {
            let page_permissions = this.$root.getScreenPermissions("Banners")
            this.has_add_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "add_banner")
            this.has_edit_permission = this.$root.getPermissionStatus(page_permissions?.permissions, "edit_banner")
        },
    },
    watch: {
        bannersResponse(data) {
            this.show_banner_form = false;
        },
        bannersToast(data) {
            data.status ? this.$toast.success(data.message) : this.$toast.error(data.message)
        }
    },
    mounted() {
        this.checkPermissions()
        this.getBanners()
    },
}
</script>