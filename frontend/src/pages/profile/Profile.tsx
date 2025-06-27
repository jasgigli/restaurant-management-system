import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Profile: React.FC = () => (
  <MainLayout>
    <Card>
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <form className="space-y-4 max-w-lg">
        <Input label="Name" name="name" />
        <Input label="Email" name="email" type="email" />
        <Button type="submit">Update</Button>
      </form>
    </Card>
  </MainLayout>
);

export default Profile;
