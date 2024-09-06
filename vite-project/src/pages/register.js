export function registerPage () {
    const $container = document.createElement('div');
    $container.classList.add("w-1/3", "mx-auto", "p-4", "bg-white", "rounded-md", "shadow-md", "my-40");
    $container.innerHTML = `<h1 class="text-2xl text-center">Registrarse</h1>
    <form class="mt-4">
      <div class="mb-4">
        <label for="email" class="block text-sm">Username</label>
        <input type="text" id="text" name="text" class="w-full px-2 py-1 border border-gray-300 rounded-md">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm">Password</label>
        <input type="password" id="password" name="password" class="w-full px-2 py-1 border border-gray-300 rounded-md">
      </div>
      <button type="submit" class="w-full py-1 bg-blue-500 text-white rounded-md">Login</button>
    </form>`;
    return $container
}