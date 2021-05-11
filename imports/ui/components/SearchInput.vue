<template>
    <form @submit.prevent="submit" class="container mx-auto my-4">
        <div class="w-full max-w-4xl mx-auto">
            <div class="shadow flex flex-grow rounded-md border border-purple-900 mb-6 overflow-hidden">
                <input v-model="query" class="w-full rounded-md outline-none py-4 px-6 flex-grow" dir="auto" type="text" placeholder="Search...">
                <button class=" w-auto flex justify-end items-center text-purple-900 p-2 outline-none" type="submit">
                    <svg v-if="loading" class="animate-spin h-6 w-6 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <div class="flex justify-between align-middle gap-x-4 gap-y-3">
                <select v-model="model" class="bg-transparent py-2 outline-none border-r-2 bg-purple-500 text-white px-4 rounded rounded-md w-1/3 focus:outline-none">
                    <option value="boolean">Boolean Model</option>
                    <option value="ext-boolean">Extended Boolean Model</option>
                    <option value="vector">Vector model</option>
                </select>
                <button class="bg-white flex justify-center items-center border border-purple-900 px-4 py-2 rounded rounded-md w-1/3 hover:bg-purple-700 outline-none focus:outline-none hover:shadow hover:text-white" @click="$emit('config')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Settings
                </button>
            </div>
        </div>
    </form>
</template>

<script>

export default {
    name: "SearchInput",
    props: {
      loading: {
          type: Boolean,
          default: false
      }
    },
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