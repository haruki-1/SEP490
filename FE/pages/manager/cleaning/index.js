import React, { useState } from 'react';
import ManagerLayout from '../layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { assignHomestay } from '@/pages/api/cleaning/assignHomestay';
import { getCleaningStaff } from '@/pages/api/cleaning/getCleaningStaff';

const Cleaning = () => {
  const queryClient = useQueryClient();
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [selectedHomestayId, setSelectedHomestayId] = useState(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const { data: staffData, isLoading, error } = useQuery({
    queryKey: ['cleaningStaff'],
    queryFn: getCleaningStaff,
  });

  const assignMutation = useMutation({
    mutationFn: assignHomestay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleaningStaff'] });
      setAssignDialogOpen(false);
      toast.success('Homestay assigned successfully');
    },
    onError: () => {
      toast.error('Failed to assign homestay');
    },
  });

  const handleAssign = () => {
    if (!selectedHomestayId || !selectedStaffId) {
      toast.error('Please select a homestay');
      return;
    }
    assignMutation.mutate({ staffId: selectedStaffId, homestayId: selectedHomestayId });
  };

//   if (isLoading) return <p>Loading staff data...</p>;
//   if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <ManagerLayout>
      <h1 className='text-2xl font-bold mb-6'>Cleaning Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Assigned Homestay</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffData?.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.homestay || 'Not assigned'}</TableCell>
              <TableCell>
                <Button onClick={() => { setSelectedStaffId(staff.id); setAssignDialogOpen(true); }}>Assign</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Homestay</DialogTitle>
          </DialogHeader>
          <Select onValueChange={(value) => setSelectedHomestayId(value)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Homestay' />
            </SelectTrigger>
            <SelectContent>
              {/* Giả sử danh sách homestay được truyền từ API */}
              {staffData?.homestays?.map((homestay) => (
                <SelectItem key={homestay.id} value={homestay.id}>
                  {homestay.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAssign}>Confirm Assign</Button>
        </DialogContent>
      </Dialog>
    </ManagerLayout>
  );
};

export default Cleaning;
