export function homePage () {
    const $container = document.createElement('div');
    $container.classList.add("w-1/3", "mx-auto", "p-4", "bg-white", "rounded-md", "shadow-md", "my-40");
    $container.innerHTML = `<h1 class="text-2xl text-center">Home</h1>`;
    return $container
}