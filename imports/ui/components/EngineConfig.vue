<template>
    <div>
        <vue-tailwind-modal
                :showing="value"
                :showClose="true"
                :backgroundClose="true"
                class="shadow shadow-lg"
                @close="handleClose"
        >
            <div>
                <alert v-show="successMessage" :message="successMessage" type="success" />
                <alert v-show="errorMessage" :message="errorMessage" type="error" />

                <div class="font-bold text-xl mb-2">Index New Documents</div>
                <div class="flex w-full items-center justify-center bg-grey-lighter">
                    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-purple-700 rounded-lg shadow-lg tracking-wide uppercase border border-purple-700 cursor-pointer hover:bg-purple-700 hover:text-white">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal text-center">Select Documents<br/>(only .docx)</span>
                        <input type='file' class="hidden" multiple @change="handleFileSelect" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                    </label>
                </div>
                <div v-if="files.length" class="text-gray-500 mt-2 mb-3">
                    Selected files: {{ files.map(f => f.name).join(', ') }}
                </div>
                <div class="text-center mt-4">
                    <button class="rounded px-6 py-2 text-white outline-none focus:outline-none"
                            :class="files.length && !indexing ? 'bg-purple-700 hover:text-purple-700 hover:bg-white' : 'bg-purple-400 pointer-events-none'"
                            :disabled="!files.length || indexing"
                            @click="handleSubmitNewDocuments">
                        <span v-if="indexing" class="flex justify-between items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Indexing
                        </span>
                        <span v-else>
                            Start indexing
                        </span>
                    </button>
                </div>
            </div>
            <hr class="mx-4 mt-6 mb-12" />
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="font-bold text-lg">Weighing algorithm</div>
                    <div>
                        <select v-model="weightAlgorithm" @change="handleSubmitWeightingAlgorithm">
                            <option value="tf" v-text="'TF'"/>
                            <option value="idf" v-text="'IDF'"/>
                            <option value="tf-idf" v-text="'TF-IDF'"/>
                        </select>
                    </div>
                </div>
            </div>
        </vue-tailwind-modal>
    </div>
</template>

<script>
import VueTailwindModal from 'vue-tailwind-modal';
import Alert from "./Alert";

export default {
    name: "EngineConfig",
    props: {
        value: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        Alert,
        VueTailwindModal
    },
    mounted() {
        Meteor.call('getWeightingAlgorithm', (err, weightAlgorithm) => {
            if (err) {
                return this.errorMessage = err.message;
            }
            this.weightAlgorithm = weightAlgorithm;
        })
    },
    data() {
        return {
            files: [],
            filesAsBinary: [],
            errorMessage: '',
            successMessage: '',
            filesLocale: 'ar',
            weightAlgorithm: 'tf-idf',
            indexing: false
        }
    },
    methods: {
        handleClose() {
            this.files = [];
            this.$emit('input', false);
        },
        handleFileSelect(event) {
            this.files = Array.from(event.target.files);
            this.filesAsBinary = [];

            this.files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    this.filesAsBinary.push({ blob: reader.result, name: file.name });
                };
                reader.readAsBinaryString(file);
            })
        },
        handleSubmitNewDocuments() {
            this.errorMessage = '';
            this.successMessage = '';
            this.indexing = true;
            Meteor.call('indexFiles', this.filesAsBinary, this.filesLocale, (err) => {
                this.indexing = false;
                if (err) {
                    return this.errorMessage = err.message;
                }
                this.successMessage = 'Documents indexed successfully';
                this.files = [];
                this.filesAsBinary = [];
                setTimeout(() => this.successMessage = '', 3500);
            })
        },
        handleSubmitWeightingAlgorithm() {
            this.errorMessage = '';
            this.successMessage = '';
            Meteor.call('setWeightingAlgorithm', this.weightAlgorithm, (err) => {
                if (err) {
                    return this.errorMessage = err.message;
                }
                this.successMessage = 'Settings updated successfully';
                setTimeout(() => this.successMessage = '', 2500);
            })
        },
    }
}
</script>

<style scoped>

</style>