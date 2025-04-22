import React from 'react';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import { useTranslation } from 'react-i18next';

// Format helper
const formatVNDateTime = (date) =>
	date.toLocaleString('vi-VN', {
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

const CancelPolicy = ({ checkInDate }) => {
	const { t } = useTranslation('common');
	const checkIn = checkInDate ? new Date(checkInDate) : null;

	const fullRefundDate = checkIn ? new Date(checkIn.getTime() - 5 * 24 * 60 * 60 * 1000) : null;
	fullRefundDate.setHours(14, 0, 0, 0); // 14:00
	const partialRefundDate = checkIn ? new Date(checkIn.getTime() - 2 * 24 * 60 * 60 * 1000) : null;
	partialRefundDate.setHours(14, 0, 0, 0); // 14:00

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="border-black text-black hover:bg-gray-100 text-sm">
					{t('full-policy')}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>{t('cancellation-policy')}</DialogTitle>
				</DialogHeader>
				<div className="mt-4 space-y-6 text-sm text-gray-700">
					{checkIn ? (
						<>
							<div className="space-y-1">
								<p className="font-medium">
									{t('before')} <strong>{formatVNDateTime(fullRefundDate)}</strong>
								</p>
								<p className="text-gray-600">{t('full-refund')}</p>
								<p>{t('get-100%-back')}</p>
							</div>
							<hr />
							<div className="space-y-1">
								<p className="font-medium">
									{t('before')} <strong>{formatVNDateTime(partialRefundDate)}</strong>
								</p>
								<p className="text-gray-600">{t('partial-refund')}</p>
								<p>
									{t('get-50%-back')}
								</p>
							</div>
							<hr />
						</>
					) : (
						<p className="text-gray-500 italic">{t('please-select-a-date-to-view-cancellation-policy')}</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CancelPolicy;