import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { getHomeStay } from '@/pages/api/cleaning/getHomestay';

const CleaningStaffHomestayList = ({ staffId }) => {
  const { data: homestays, isLoading, error } = useQuery({
    queryKey: ['assignedHomestays', staffId],
    queryFn: () => getHomeStay(staffId),
  });


  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Assigned Homestays</h1>
      {homestays?.length === 0 ? (
        <p>No homestays assigned.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homestays?.length > 0 ? (
                homestays.map((homestay) => (
                    <TableRow key={homestay.id}>
                        <TableCell>{homestay.name}</TableCell>
                        <TableCell>{homestay.location}</TableCell>
                        <TableCell>{homestay.description}</TableCell>
                    </TableRow>
             ))
            ) : (
                <TableRow>
                <TableCell colSpan={3} className="text-center">No homestays assigned.</TableCell>
             </TableRow>
              )}
            </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CleaningStaffHomestayList;
