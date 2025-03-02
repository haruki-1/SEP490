import React from 'react';
import ManagerLayout from '../layout';
import { useQuery } from '@tanstack/react-query';
import { getAllVouchers } from 'pages/api/voucher/getVouchers';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/components/ui/table';
import { Button } from '@/components/components/ui/button';

const VoucherList = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['vouchers'],
		queryFn: getAllVouchers,
	});

	return (
		<ManagerLayout>
			<h1 className='text-2xl font-bold mb-4'>Voucher List</h1>
			{isLoading ? (
				<div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50'>
					<div className='w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
				</div>
			) : error ? (
				<p>Error: {error.message}</p>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Image</TableHead>
							<TableHead>Code</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Discount (%)</TableHead>
							<TableHead>Start Date</TableHead>
							<TableHead>End Date</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((voucher) => (
							<TableRow key={voucher.voucherID}>
								<TableCell>
									<img src={voucher.image} alt='Voucher' className='w-16 h-16 object-cover rounded' />
								</TableCell>
								<TableCell className='font-medium'>{voucher.code}</TableCell>
								<TableCell>{voucher.description}</TableCell>
								<TableCell>{voucher.discount}%</TableCell>
								<TableCell>{new Date(voucher.startDate).toLocaleDateString('vi')}</TableCell>
								<TableCell>{new Date(voucher.endDate).toLocaleDateString('vi')}</TableCell>
								<TableCell>
									<div>
										<Button>Edit</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</ManagerLayout>
	);
};

export default VoucherList;
