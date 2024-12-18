import { ReactNode } from 'react';
import { Header } from '../organisms/Navigator';
import { Footer } from '../organisms/Footer';

const LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  return (
  <div className='container'>
    {children}
  </div>
)
);

export default Layout;
