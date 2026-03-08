<style scoped>
    .footer-container { @apply font-['Inter'] py-[10px] w-full; }
    .footer-container > span{ @apply text-[13px]; }
</style>

<template>
    <div class="footer-container">
        <span>© HashFlow 2023 | Designed by Joshua Roy Auxillio, Patrick James Cada, & John Carlo Villarez</span>
    </div>
</template>

<script>
    // Added
    import '/src/assets/tailwind.css';
    
    export default {
        name: 'FooterComponent',
    };
</script>