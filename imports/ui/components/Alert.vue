<template>
    <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md border"
         :class="type === 'error' ? 'text-red-700 bg-red-100 border-red-300' : 'text-green-700 bg-green-100 border-green-300'">
        <div slot="avatar">
            <svg v-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-alert-octagon w-5 h-5 mx-2">
                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle w-5 h-5 mx-2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <div class="text-xl font-normal max-w-full flex-initial">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'error'
        }
    }
}
</script>

<style scoped>

</style>