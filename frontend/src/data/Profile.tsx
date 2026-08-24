import React from 'react';

type ProfileTag = React.ElementType;

export interface ProfileData {
  name: string;
  rol: string;
  bio: string;
  location: string;
  description: string;
}

export const profile: ProfileData = {
  name: 'Yamid Rodriguez',
  rol: 'Full Stack Developer',
  bio: 'Convierto problemas en soluciones reales',
  location: 'Chitagá, Colombia',
  description: 'Mi nombre es Yamid Horacio Rodriguez, tengo 23 años. Desarrollador web con 3 años de experiencia en React, Astro, JavaScript, Tailwind CSS, Python, Linux y Cloudflare. Especializado en aplicaciones web y mobile, automatización, despliegues en producción y soporte técnico. Creador de contenido tecnológico y fundador de una comunidad con talleres y proyectos colaborativos. Busco oportunidades remotas como desarrollador web o profesional de soporte técnico.'
};

type ProfileProps<T extends ProfileTag = 'div'> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>;

const Profile = <T extends ProfileTag = 'div'>({
  as,
  children,
  className = '',
  content,
  ...props
}: ProfileProps<T>) => {
  const Component = as || 'div';

  return (
    <Component className={className} {...props}>
      {children ?? content ?? profile.description}
    </Component>
  );
};

export default Profile;
