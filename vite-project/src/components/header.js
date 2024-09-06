export function Header() {
    const $header = document.createElement('header');
    $header.classList.add("bg-blue-500", "text-white", "text-center", "py-4", "mb-4");
    $header.innerHTML = `
    <header>
    <nav>
        <ul class="flex justify-center gap-4">
            <li><a href="/login">Sesion</a></li>
            <li><a href="/register">registro</a></li>
        </ul>
    </nav>
</header>
`;

    return $header
}

