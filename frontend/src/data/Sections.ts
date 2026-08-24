import Profile, {profile} from "./Profile";

const Sections = {
  about: {
    id:"about-me",
    title: "Sobre mí",
    description: profile.description,
    color: "#0166B0"
  },
  services: {
    id: "services",
    description: "",
    title: "Servicios"
  },
  success_stories: {
    id:"success-stories",
    description: "",
    title: "Casos de Éxito"
  },
  projects: {
    id:"projects",
    description: "",
    title: "Proyectos"
  },
  contact: {
    id:"contact",
    description: "",
    title: "Decir: ¡Hola!"
  }
};

export default Sections;