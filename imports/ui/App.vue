<template>
    <div class="flex h-full items-center flex-col min-h-screen bg-gray-100 overflow-y-scroll">
        <div class="w-full">
            <div class="text-center mt-3">
                <div class="text-2xl font-bold">Information Retrieval Homework F20</div>
                <div class="flex gap-4 my-3 text-purple-800 items-center justify-center text-xl font-semibold">
                    <span>mohamed_khair_128199</span>
                    <span>iman_129732</span>
                </div>
            </div>
            <search-input :loading="loading" @search="handleSearchChanged" @config="configModal = true" />
        </div>

        <results-list v-if="results" v-show="!loading" :results="results" />

        <engine-config v-model="configModal" />
    </div>
</template>

<script>

import SearchInput from "./components/SearchInput";
import ResultsList from "./components/ResultsList";
import EngineConfig from "./components/EngineConfig";

export default {
    components: {EngineConfig, ResultsList, SearchInput},
    data() {
        return {
            query: '',
            firstLoad: true,
            results: null,
            loading: false,
            configModal: false
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
