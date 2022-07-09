import { ReactNode } from 'react';
import Header from './HeaderAuthen';

function AuthenLayout({ children }: any): ReactNode {
  return (
    <div>
      <Header />
      <div className="contentAuthen" style={{ marginBottom: '30px' }}>
        {children}
      </div>
    </div>
  );
}

export default AuthenLayout;
