import React from 'react';
import Link from 'next/link';
import { Globe, DollarSign, Facebook, Twitter, Instagram, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './components/ui/button';

const Footer = () => {
	return (
		<footer className='bg-white text-gray-600 sec-com border-t border-gray-100'>
			<div className='container-lg'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					{/* About Section */}
					<div>
					<h2 className='text-gray-800 text-lg font-bold mb-4'>About HomeStay</h2>
						<p className='text-gray-500 text-sm leading-relaxed mb-4'>
							Find perfect homestays for your travels. We connect travelers with unique accommodations for
							authentic experiences around the world.
						</p>
						<div className='flex items-center space-x-4 mt-6'>
							<a href='#' className='text-gray-400 hover:text-blue-600 transition-colors'>
								<Facebook size={20} />
							</a>
							<a href='#' className='text-gray-400 hover:text-blue-600 transition-colors'>
								<Twitter size={20} />
							</a>
							<a href='#' className='text-gray-400 hover:text-blue-600 transition-colors'>
								<Instagram size={20} />
							</a>
						</div>
					</div>
					{/* Useful Links */}
					<div>
						<h2 className='text-gray-800 text-lg font-bold mb-4'>Useful Links</h2>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/home-stay'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Browse Homestays</span>
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>About Us</span>
								</Link>
							</li>
							<li>
								<Link
									href='/blog'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Blog & News</span>
								</Link>
							</li>
							<li>
								<Link
									href='/faqs'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>FAQs</span>
								</Link>
							</li>
							<li>
								<Link
									href='/privacy'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Privacy Policy</span>
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Terms & Conditions</span>
								</Link>
							</li>
						</ul>
					</div>

					{/* Host Section */}
					<div>
						<h2 className='text-gray-800 text-lg font-bold mb-4'>Host with Us</h2>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/host'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>List Your Property</span>
								</Link>
							</li>
							<li>
								<Link
									href='/host-resources'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Host Resources</span>
								</Link>
							</li>
							<li>
								<Link
									href='/host-guidelines'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Hosting Guidelines</span>
								</Link>
							</li>
							<li>
								<Link
									href='/responsible-hosting'
									className='text-gray-500 hover:text-blue-600 flex items-center group'
								>
									<ChevronRight
										size={16}
										className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'
									/>
									<span>Responsible Hosting</span>
								</Link>
							</li>
						</ul>
						<Button className='mt-4 bg-blue-600 hover:bg-blue-700'>Become a Host</Button>
					</div>

					{/* Contact Section */}
					<div>
						<h2 className='text-gray-800 text-lg font-bold mb-4'>Contact Us</h2>
						<ul className='space-y-3'>
							<li className='flex items-start'>
								<MapPin className='w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0' />
								<span className='text-gray-500'>123 Main Street, City Center, Country, 12345</span>
							</li>
							<li className='flex items-center'>
								<Phone className='w-5 h-5 text-blue-600 mr-3 flex-shrink-0' />
								<span className='text-gray-500'>+1 234 567 8900</span>
							</li>
							<li className='flex items-center'>
								<Mail className='w-5 h-5 text-blue-600 mr-3 flex-shrink-0' />
								<span className='text-gray-500'>support@homestay.com</span>
							</li>
						</ul>
						<div className='mt-6'>
							<h3 className='text-gray-800 text-sm font-semibold mb-2'>Subscribe to our newsletter</h3>
							<div className='flex'>
								<input
									type='email'
									placeholder='Your email'
									className='bg-gray-50 text-gray-700 text-sm py-2 px-3 rounded-l-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full'
								/>
								<button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md transition-colors'>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className='pt-8 mt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center'>
					<div className='flex items-center space-x-4 mb-4 md:mb-0'>
						<ThemeToggle />
						<div className='flex items-center text-gray-500 hover:text-gray-700 cursor-pointer'>
							<Globe className='w-4 h-4 mr-1' />
							<span className='text-sm'>English</span>
						</div>
						<div className='flex items-center text-gray-500 hover:text-gray-700 cursor-pointer'>
							<DollarSign className='w-4 h-4 mr-1' />
							<span className='text-sm'>USD</span>
						</div>
					</div>

					<p className='text-sm text-gray-400'>
						&copy; {new Date().getFullYear()} HomeStay. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;