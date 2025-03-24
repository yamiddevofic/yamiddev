import { Portfolio } from "./icons/Portfolio";

const buttonProjects = () => {
    return(
        <div className="w-full flex items-center justify-end">
            <button
                data-open="projects"
                className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white flex items-center gap-x-2 py-3 px-2 rounded-2xl transition-all active:scale-90 cursor-pointer font-semibold z-10"
            >
                Haz click para ver mis proyectos
            </button>
        </div>
    )
}

export default buttonProjects;