<template>
    <div id="area-form-modal" class="mt-7 fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div
                class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form class="rounded px-8 pt-6 pb-6 mb-2">
                    <tw-icon @click="closePopup" name="heroicons-outline:x"
                        class="w-6 h-6 text-gray-400 ms-auto cursor-pointer" />
                    <div class="bg-white px-4 pt-4 pb-2 sm:p-0">
                        <div class="mt-3 text-start sm:mt-0 sm:ms-4 sm:text-left">
                            <h2 class="text-2xl text-center leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                {{ $t('master.add_banner') }}
                            </h2>

                            <div class="grid grid-cols-1">

                                <div class="col-span-1">
                                    <p class="text-gray-600">{{ $t('master.banner_image_preview') }}</p>
                                    <img v-if="!image_preview" src="@/assets/image_preview_thumb.svg"
                                        class="h-40 cursor-pointer mt-2 mb-4" />
                                    <img v-else :src="image_preview" class="h-40 cursor-pointer mt-2 mb-4" />
                                </div>

                                <div @dragover.prevent @drop.prevent class="grid grid-cols-1 h-40 bg-color-light-gray">
                                    <div @drop="dragBannerImageFile" class="m-auto">
                                        <div class="w-full -mt-4">
                                            <img src="@/assets/cloud_upload.svg" class="w-12 h-12 cursor-pointer m-auto" />
                                            <p class="font-xs text-gray-700 w-full text-center">
                                                {{ $t('master.drag_and_drop_a_file_here') }}</p>
                                            <p class="font-xs text-center text-gray-700">{{ $t('master.or') }}</p>
                                            <div class="w-full text-center pt-2">
                                                <input id="banner-image-file-upload" @change="uploadBannerImageFile($event)"
                                                    accept="image/*" type="file" hidden class="hidden">
                                                <span @click="selectBannerImage"
                                                    class="font-xs text-white bg-sunglow rounded-lg px-4 py-1 cursor-pointer">{{ $t('button.choose_file') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 text-gray-700 text-sm font-medium mt-2">
                                    <p>Resolution: 720 x 600</p>
                                    <p class="text-right">Format: .png, .jpg and .jpeg</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- Buttons -->
                    <div class="sm:flex sm:flex-row-reverse mt-6">
                        <button v-if="!selected_banner" type="button" @click.once="addNewBanner" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.create') }}
                        </button>
                        <button v-if="selected_banner" type="button" @click.once="updateExistingBanner" class="w-full inline-flex justify-center border-2 border-color-primary 
                                    shadow-sm px-4 py-2 font-semibold text-base btn-outline-primary 
                                    focus:outline-none sm:ms-3 sm:w-auto sm:text-sm">
                            {{ $t('button.update') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: ["modal_title", "selected_banner"],
    data() {
        return {
            form_data: {
                image: '',
                is_active: true
            },
            image_preview: '',

        }
    },
    methods: {
        ...mapActions(["addBanner", "updateBanner"]),

        closePopup() {
            this.$emit('close-modal');
        },

        validateImageFile() {

            if (!form_data.image) {
                alert('No file chosen');
                return false;
            }

            if (form_data.image.image.size > 1000000 * 1000000) {
                alert('File too big (> 1MB)');
                return false;
            }
            return true
        },

        addNewBanner() {
            if (this.validateImageFile) {
                this.addBanner(this.form_data)
            }
        },
        updateExistingBanner() {
            if (this.validateImageFile) {
                this.updateBanner({
                    id: this.selected_banner.id,
                    form_data: this.form_data
                })
            }
        },


        selectBannerImage() {
            document.getElementById("banner-image-file-upload").click()
        },

        uploadBannerImageFile(e) {
            this.form_data.image = e.target.files[0];

            const file = e.target.files[0];
            if (file && file.size > 1000000) {
                this.image = "";
            } else {
                this.image = file;
            }
        },

        dragBannerImageFile(e) {
            this.form_data.image = e.dataTransfer.files[0];
            let reader = new FileReader
            reader.onload = e => {
                this.image_preview = e.target.result
            }
            reader.readAsDataURL(this.form_data.image)
            this.$emit('input', this.form_data.image)
        },

        setSelectedBanner() {
            this.image_preview = this.selected_banner?.image ?? ''
        }
    },
    mounted() {
        this.setSelectedBanner()
    },
}
</script>