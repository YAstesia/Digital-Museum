<script setup>
function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div id="hero" class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(255, 160, 122) 0%, rgb(255, 222, 173) 100%); 
                clip-path: ellipse(150% 87% at 120% 13%)">
                <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                    <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span
                            class="font-light block">用数据展示</span>博物馆的文化魅力</h1>
                    <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">用数据为您展示全国各大博物馆的信息</p>
                    <Button label="进入网站" as="router-link" to="/dashboard" rounded class="!text-xl mt-8 !px-4"
                        style="background-color:lightsalmon; border-color: black; color: black;"></Button>
                </div>
                <div class="flex justify-center md:justify-end">
                    <img rel="preload" src="/demo/images/landing/landing1.png" alt="Hero Image"
                        class="w-9/12 md:w-auto transform transition-transform duration-1000 ease-in-out opacity-0 translate-y-10 animate-fade-in"
                        style="margin-top: -150px; width: 500px; height: 400px; margin-right: 80px;" loading="lazy" />
                </div>
            </div>

            <div id="hero" class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(255, 160, 122) 0%, rgb(255,128,144) 100%); 
                clip-path: ellipse(150% 50% at -15% 50%); margin-top: -30px;">
                <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                    <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span
                            class="font-light block">丰富的</span>图表展示风格</h1>
                    <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">图文并茂，数据统计一目了然</p>
                    <Button label="进入网站" as="router-link" to="/dashboard" rounded class="!text-xl mt-8 !px-4"
                        style="background-color:lightsalmon; border-color: black; color: black;"></Button>
                </div>
                <div class="flex justify-center md:justify-end">
                    <img rel="preload" src="/demo/images/landing/landing1.png" alt="Hero Image"
                        class="w-9/12 md:w-auto transform transition-transform duration-1000 ease-in-out opacity-0 translate-y-10 animate-fade-in"
                        style="margin-top: -150px; width: 500px; height: 400px; margin-right: 80px;" loading="lazy" />
                </div>
            </div>

            <div id="hero" class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(240, 230, 140) 0%, rgb(255, 218, 185) 100%); 
                clip-path: ellipse(150% 87% at 105% 90%); margin-top: -30px;">
                <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                    <h1 class="text-6xl font-bold text-gray-900 leading-tight"><span
                            class="font-light block">生动的</span>数据展示样式</h1>
                    <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">所见即所得，让数据展示更加直观</p>
                    <Button label="进入网站" as="router-link" to="/dashboard" rounded class="!text-xl mt-8 !px-4"
                        style="background-color:lightsalmon; border-color: black; color: black;"></Button>
                </div>
                <div class="flex justify-center md:justify-end">
                    <img rel="preload" src="/demo/images/landing/landing1.png" alt="Hero Image"
                        class="w-9/12 md:w-auto transform transition-transform duration-1000 ease-in-out opacity-0 translate-y-10 animate-fade-in"
                        style="margin-top: -150px; width: 500px; height: 400px; margin-right: 80px;" loading="lazy" />
                </div>
            </div>

        </div>
    </div>
</template>

<!-- 使用自定义 @keyframes 动效 -->
<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 1.5s ease-in-out forwards;
}

.logo-image {
    max-width: 100%;
    height: 50px;
    margin-top: 0%;
    margin-bottom: 0;
}
</style>
