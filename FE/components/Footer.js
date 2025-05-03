import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe, DollarSign, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './components/ui/button';
import { useTranslation } from 'react-i18next'; // <--- Thêm dòng này

const Footer = () => {
	const { t } = useTranslation(); // <--- Sử dụng hook

const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

	return (
		mounted && (
		<footer className='text-gray-600 bg-white border-t border-gray-100 sec-com'>
			<div className='container-lg'>
				<div className='grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* About Section */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('about-homestay')}</h2>
						<p className='mb-4 text-sm leading-relaxed text-gray-500'>
							{t('about-description')}
						</p>
						<div className='flex items-center mt-6 space-x-4'>
							{/* ... */}
						</div>
					</div>

					{/* Useful Links */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('useful-links')}</h2>
						<ul className='space-y-2'>
							<li>
								<Link href='/home-stay' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									{/* ChevronRight */}
									<span>{t('browse-homestays')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('about-us')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('blog-news')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('faqs')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('privacy-policy')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('terms-conditions')}</span>
								</Link>
							</li>
						</ul>
					</div>

					{/* Host Section */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('host-with-us')}</h2>
						<ul className='space-y-2'>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('list-your-property')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('host-resources')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('hosting-guidelines')}</span>
								</Link>
							</li>
							<li>
								<Link href='#' className='flex items-center text-gray-500 hover:text-blue-600 group'>
									<span>{t('responsible-hosting')}</span>
								</Link>
							</li>
						</ul>
						<Button className='mt-4 bg-blue-600 hover:bg-blue-700'>{t('become-host')}</Button>
					</div>

					{/* Contact Section */}
					<div>
						<h2 className='mb-4 text-lg font-bold text-gray-800'>{t('contact-us')}</h2>
						<ul className='space-y-3'>
							<li className='flex items-start'>
								{/* MapPin */}
								<span className='text-gray-500'>{t('contact-address')}</span>
							</li>
							<li className='flex items-center'>
								{/* Phone */}
								<span className='text-gray-500'>{t('contact-phone')}</span>
							</li>
							<li className='flex items-center'>
								{/* Mail */}
								<span className='text-gray-500'>{t('contact-email')}</span>
							</li>
						</ul>
						<div className='mt-6'>
							<h3 className='mb-2 text-sm font-semibold text-gray-800'>{t('subscribe-newsletter')}</h3>
							<div className='flex'>
								<input
									type='email'
									placeholder={t('your-email')}
									className='...'
								/>
								<button className='...'>
									{t('send')}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className='flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-100 md:flex-row'>
					<div className='flex items-center mb-4 space-x-4 md:mb-0'>
						<ThemeToggle />
					</div>

					<p className='text-sm text-gray-400'>
						&copy; {new Date().getFullYear()} HomeStay. {t('all-rights-reserved')}
					</p>
				</div>
			</div>
		</footer>
	)
	)
};

export default Footer;