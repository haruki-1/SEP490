import { useRouter } from 'next/router';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './components/ui/breadcrumb';

const routesMap = {
	homestay: 'Homestay',
	facility: 'Facility',
	amenity: 'Amenity',
	posts: 'Posts',
	account: 'Account',
};

const ManagerBreadcrumb = () => {
	const { pathname } = useRouter();
	const pathSegments = pathname
		.split('/')
		.filter((segment) => segment && segment.toLowerCase() !== 'home' && segment.toLowerCase() !== 'manager');

	if (pathSegments.length === 0) return null;
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathSegments.map((segment, index) => {
					const isLast = index === pathSegments.length - 1;
					const label =
						routesMap[segment.toLowerCase()] || segment.charAt(0).toUpperCase() + segment.slice(1);

					return (
						<div key={segment} className='flex items-center'>
							{index > 0 && <BreadcrumbSeparator />}
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={`/manager/${pathSegments.slice(0, index + 1).join('/')}`}>
										{label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default ManagerBreadcrumb;
