
const Nav = () => {
    return (
        <div className="h-16 shadow-sm rounded-b-sm bg-white flex flex-row justify-between px-10 absolute w-full items-center text-lg">
            <p>Navigation</p>
            <ul className="flex flex-row gap-4">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a> </li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    );
}

export default Nav;