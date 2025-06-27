import React from 'react';
import MainLayout from '../layout/MainLayout';
import { Card } from '../components/ui/card';

const Settings: React.FC = () => (
  <MainLayout>
    <Card>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <p>Settings form goes here...</p>
    </Card>
  </MainLayout>
);

export default Settings;
