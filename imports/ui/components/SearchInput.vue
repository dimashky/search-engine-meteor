<template>
    <form @submit.prevent="submit" class="container mx-auto my-4">
        <div class="w-full max-w-4xl mx-auto">
            <div class="shadow flex flex-grow rounded-full border border-purple-900 mb-6 overflow-hidden">
                <input v-model="query" class="w-full rounded-full outline-none py-4 px-6 flex-grow" dir="auto" type="text" placeholder="Search...">
                <button class=" w-auto flex justify-end items-center text-purple-900 p-2 outline-none" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <div class="flex justify-between align-middle gap-x-4 gap-y-3">
                <select v-model="model" class="bg-transparent py-2 outline-none border-r-2 bg-purple-800 text-white px-4 rounded rounded-full w-1/3">
                    <option value="boolean">Boolean Model</option>
                    <option value="ext-boolean">Extended Boolean Model</option>
                    <option value="vector">Vector model</option>
                </select>
                <button class="bg-white border border-purple-900 px-4 py-2 rounded rounded-full w-1/3 hover:bg-purple-700 outline-none hover:shadow hover:text-white" @click="$emit('config')">
                    Settings
                </button>
            </div>
        </div>
    </form>
</template>

<script>

export default {
    name: "SearchInput",
    data() {
        return {
            model: 'vector',
            query: '',
        }
    },
    watch: {
        model() {
            this.submit();
        }
    },
    methods: {
        submit() {
            const {query, model} = this;
            this.$emit('search', {query, model});
        }
    }
}
</script>

<style scoped>

</style>