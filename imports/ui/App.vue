<template>
    <div class="flex h-full items-center flex-col min-h-screen bg-gray-100">
        <div class="w-full">
            <div class="text-center mt-3">
                <div class="text-2xl font-bold">Information Retrieval Homework F20</div>
                <div class="flex gap-4 my-3 text-purple-800 items-center justify-center text-xl font-semibold">
                    <span>mohamed_khair_128199</span>
                    <span>iman_129732</span>
                </div>
            </div>
            <search-input @search="handleSearchChanged" />
        </div>

        <results-list v-if="results" :results="results" />
    </div>
</template>

<script>

import SearchInput from "./components/SearchInput";
import ResultsList from "./components/ResultsList";
export default {
    components: {ResultsList, SearchInput},
    data() {
        return {
            query: '',
            firstLoad: true,
            results: null,
            loading: false
        }
    },
    methods: {
        handleSearchChanged({ model, query }) {
            this.results = null;
            if (!query) {
                return;
            }
            this.loading = true;
            Meteor.call('match', query, model, (error, result) => {
                if (error) {
                    alert(error.error);
                    return this.loading = false;
                }
                this.results = result;
                this.loading = false;
            })
        }
    }
}
</script>

<style>
</style>
