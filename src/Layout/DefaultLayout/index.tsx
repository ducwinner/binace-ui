import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

function DefaultLayout({ children }: any): ReactNode {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
