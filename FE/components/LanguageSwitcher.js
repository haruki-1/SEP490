import { useRouter } from 'next/router';
import { Globe } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Button } from './components/ui/button';

export default function LanguageSwitcher() {
	const router = useRouter();

	const handleLanguageChange = (locale) => {
		router.push(router.asPath, router.asPath, { locale });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm' className='flex items-center gap-2 px-3 rounded-md hover:bg-gray-100'>
					<Globe className='w-4 h-4' />
						<span>
							{router.locale === 'en' 
								? 'English' 
								: router.locale === 'ja' 
								? '日本語' 
								: 'Tiếng Việt'}
						</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => handleLanguageChange('en')}
					className={router.locale === 'en' ? 'bg-gray-100 font-medium' : ''}
				>
					English
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleLanguageChange('vi')}
					className={router.locale === 'vi' ? 'bg-gray-100 font-medium' : ''}
				>
					Tiếng Việt
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleLanguageChange('ja')}
					className={router.locale === 'ja' ? 'bg-gray-100 font-medium' : ''}
				>
					日本語
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}