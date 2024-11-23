import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const SigninLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default SigninLayout;