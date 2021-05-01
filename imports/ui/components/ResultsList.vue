<template>
<div class="container mb-12">
    <div :class="selectedDocument ? 'grid grid-cols-12 gap-4' : ''">
        <div class="col-span-4 w-full max-w-2xl mx-auto bg-white shadow-lg p-3">
            <div v-if="results.length">
                <div class="flex items-center gap-4">
                    <div class="font-semibold mb-2 text-lg">Results ({{ results.length }})</div>
                    <svg v-if="fetchingDocument" class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <div v-for="(result, idx) in results" :key="idx"
                     class="flex justify-start cursor-pointer text-gray-700 hover:text-purple-800 hover:bg-purple-100 rounded-md px-2 py-2 mt-2 mb-4"
                     :class="selectedDocument && selectedDocument.id === result.document ? 'text-purple-800 bg-purple-100' : ''"
                     @click="handleSelectDocument(result.document)">
                    <span class="rounded-full bg-gray-200 h-6 w-6 text-center">{{ idx + 1 }}. </span>
                    <div class="flex-grow font-medium px-2">{{ result.document }}</div>
                    <div class="text-sm font-normal text-gray-500 tracking-wide">{{ result.relevance.toFixed(3) }}</div>
                </div>
            </div>
            <div v-else class="text-center text-xl flex gap-3 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                No results
            </div>
        </div>
        <div v-if="selectedDocument" class="bg-white px-2 py-3 col-span-8 h-full w-full">
            <template v-if="!fetchingDocument">
                <div class="text-purple-800 font-semibold hover:text-blue-800 text-xl">{{ selectedDocument.id }}</div>
                <hr class="my-3" />
                <div :dir="selectedDocument.isArabic ? 'rtl' : 'ltr'" v-html="selectedDocument.preview"/>
            </template>
            <div v-else class="h-full flex justify-center items-center w-full">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ResultsList",
    props: {
        results: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            selectedDocument: null,
            fetchingDocument: false
        }
    },
    methods: {
        handleSelectDocument(documentId) {
            if(this.selectedDocument && this.selectedDocument.id === documentId) {
                return this.selectedDocument = null;
            }
            this.fetchingDocument = true;
            Meteor.call('getDocumentContent', documentId, (err, document) => {
                this.fetchingDocument = false;
                if(err) {
                    return alert(err.message);
                }
                this.selectedDocument = {
                    id: documentId,
                    preview: document.document,
                    isArabic: document.isArabic
                };
            })
        }
    }
}
</script>

<style scoped>

</style>