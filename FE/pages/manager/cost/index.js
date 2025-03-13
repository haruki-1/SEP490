import React, { useState, useEffect } from 'react';
import ManagerLayout from '../layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { Button } from '@/components/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import { getAllCosts } from '@/pages/api/cost/getCost';
import { updateCost } from '@/pages/api/cost/updateCost';
import { createCost } from '@/pages/api/cost/createCost';

const CostList = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCostId, setCurrentCostId] = useState(null);
  const [costData, setCostData] = useState({ name: '', amount: 0, description: '' });

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ['costs'], queryFn: getAllCosts});

  const createCostMutation = useMutation({
    mutationFn: createCost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costs'] });
      setOpen(false);
      resetForm();
      toast.success('Cost added successfully');
    },
    onError: () => toast.error('Failed to add cost'),
  });

  const updateCostMutation = useMutation({
    mutationFn: ({ id, data }) => updateCost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costs'] });
      setOpen(false);
      resetForm();
      toast.success('Cost updated successfully');
    },
    onError: () => toast.error('Failed to update cost'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && currentCostId) {
      updateCostMutation.mutate({ id: currentCostId, data: costData });
    } else {
      createCostMutation.mutate(costData);
    }
  };

  const handleEdit = (cost) => {
    setCostData({ name: cost.name, amount: cost.amount, description: cost.description });
    setEditMode(true);
    setCurrentCostId(cost.id);
    setOpen(true);
  };

  const resetForm = () => {
    setCostData({ name: '', amount: 0, description: '' });
    setEditMode(false);
    setCurrentCostId(null);
  };

  return (
    <ManagerLayout>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Cost List</h1>
        <Button onClick={() => { resetForm(); setOpen(true); }}>Add New Cost</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Cost' : 'Create New Cost'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Label>Name</Label>
            <Input name='name' value={costData.name} onChange={(e) => setCostData({ ...costData, name: e.target.value })} required />

            <Label>Amount</Label>
            <Input type='number' name='amount' value={costData.amount} onChange={(e) => setCostData({ ...costData, amount: parseFloat(e.target.value) })} required />

            <Label>Description</Label>
            <Input name='description' value={costData.description} onChange={(e) => setCostData({ ...costData, description: e.target.value })} />

            <div className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
              <Button type='submit'>{editMode ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost.name}</TableCell>
                <TableCell>{cost.amount}</TableCell>
                <TableCell>{cost.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(cost)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </ManagerLayout>
  );
};

export default CostList;
