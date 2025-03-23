import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/components/ui/table';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { toast } from 'sonner';
import { uploadHomestayImage } from '../api/cleaning/uploadHomestayImage';
import { getHomeStayDetail } from '../api/cleaning/getHomeStayDetail';
import { useRouter } from 'next/navigation';

const Homestay = ({ homestayId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [damageStatus, setDamageStatus] = useState({});
  const router = useRouter();

  const { data: homestay, isLoading, error } = useQuery({
    queryKey: ['homestayDetail', homestayId],
    queryFn: () => getHomeStayDetail(homestayId),
  });

  const uploadMutation = useMutation({
    mutationFn: uploadHomestayImage,
    onSuccess: () => {
      toast.success('Image uploaded successfully');
    },
    onError: () => {
      toast.error('Failed to upload image');
    },
  });

  const handleFileChange = (e, itemId) => {
    setSelectedFile({ ...selectedFile, [itemId]: e.target.files[0] });
  };

  const handleUpload = (itemId) => {
    if (!selectedFile || !selectedFile[itemId]) {
      toast.error('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile[itemId]);
    formData.append('homestayId', homestayId);
    formData.append('itemId', itemId);
    uploadMutation.mutate(formData);
  };

  const handleDamageChange = (itemId) => {
    setDamageStatus((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleFinish = () => {
    toast.success('Cleaning process finished successfully!');
    router.push('/cleaningstaff');
  };

  const renderTable = (data, type) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Damaged</TableHead>
          <TableHead>Upload Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description || item.details}</TableCell>
            <TableCell>
              <input
                type='checkbox'
                checked={damageStatus[item.id] || false}
                onChange={() => handleDamageChange(item.id)}
              />
            </TableCell>
            <TableCell>
              <Input type='file' accept='image/*' onChange={(e) => handleFileChange(e, item.id)} />
              <Button className='mt-2' onClick={() => handleUpload(item.id)} disabled={uploadMutation.isPending}>
                {uploadMutation.isPending ? 'Uploading...' : 'Upload Image'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>{homestay?.name}</h1>
      <p><strong>Location:</strong> {homestay?.location}</p>
      <p><strong>Description:</strong> {homestay?.description}</p>

      {/* Amenities Table */}
      <h2 className='text-xl font-semibold mt-6 mb-2'>Amenities</h2>
      {renderTable(homestay?.amenities, 'amenity')}

      {/* Facilities Table */}
      <h2 className='text-xl font-semibold mt-6 mb-2'>Facilities</h2>
      {renderTable(homestay?.facilities, 'facility')}

      {/* Finish Button */}
      <Button className='mt-8' onClick={handleFinish}>Finish</Button>
    </div>
  );
};

export default Homestay;
