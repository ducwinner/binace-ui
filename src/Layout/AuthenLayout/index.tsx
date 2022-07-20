import { ReactNode } from 'react';
import Header from './HeaderAuthen';

function AuthenLayout({ children }: any): ReactNode {
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <div className="contentAuthen" style={{ paddingBottom: '30px', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default AuthenLayout;
