import { Portfolio } from "./icons/Portfolio";

const buttonProjects = () => {
    return(
        <div>
            <button
            id="projects"
            class="bg-gradient-to-r from-blue-500 to-emerald-500 text-white flex items-center gap-x-2 py-3 px-16 rounded-2xl transition-all active:scale-90 cursor-pointer font-semibold z-10"
            >
                <Portfolio />
                Proyectos
            </button>
        </div>
    )
}

export default buttonProjects;