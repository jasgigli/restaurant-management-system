import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6">Page Not Found</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  </MainLayout>
);

}
export default NotFound;
