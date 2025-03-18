import React, { useState } from 'react';
import ManagerLayout from '../layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { Button } from '@/components/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/components/ui/diaLog';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { addCleaningStaff, deleteCleaningStaff, getCleaningStaff, updateCleaningStaff } from '@/pages/api/staff/staff';

const CleaningStaffManagement = () => {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const queryClient = useQueryClient();

    const { data: staffList, isLoading } = useQuery({
        queryKey: ['cleaningStaff'],
        queryFn: getCleaningStaff
    });

    const addMutation = useMutation({
        mutationFn: addCleaningStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cleaningStaff'] });
            setOpen(false);
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateCleaningStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cleaningStaff'] });
            setOpen(false);
        }
    });
    
    const deleteMutation = useMutation({
        mutationFn: deleteCleaningStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cleaningStaff'] });
        }
    });

    const [staffData, setStaffData] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        setStaffData({ ...staffData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            updateMutation.mutate({ id: currentStaff.id, ...staffData });
        } else {
            addMutation.mutate(staffData);
        }
    };

    return (
        <ManagerLayout>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Cleaning Staff Management</h1>
                <Button onClick={() => { setOpen(true); setEditMode(false); setStaffData({ name: '', email: '', phone: '' }); }}>Add Staff</Button>
            </div>

            {isLoading ? <p>Loading...</p> : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staffList?.map((staff) => (
                            <TableRow key={staff.id}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.email}</TableCell>
                                <TableCell>{staff.phone}</TableCell>
                                <TableCell>
                                    <Button onClick={() => { setCurrentStaff(staff); setStaffData(staff); setEditMode(true); setOpen(true); }}>Edit</Button>
                                    <Button variant='destructive' onClick={() => deleteMutation.mutate(staff.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editMode ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='grid gap-2'>
                            <Label>Name</Label>
                            <Input name='name' value={staffData.name} onChange={handleChange} required />
                        </div>
                        <div className='grid gap-2'>
                            <Label>Email</Label>
                            <Input name='email' type='email' value={staffData.email} onChange={handleChange} required />
                        </div>
                        <div className='grid gap-2'>
                            <Label>Phone</Label>
                            <Input name='phone' type='tel' value={staffData.phone} onChange={handleChange} required />
                        </div>
                        <div className='flex justify-end gap-2'>
                            <Button type='button' variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type='submit'>{editMode ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </ManagerLayout>
    );
};

export default CleaningStaffManagement;
