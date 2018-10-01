import BidEdit from '../components/pages/bidEdit'
import BidsList from '../components/pages/bids'
import HomePage from '../components/pages/home'
import MerchantEditPage from '../components/pages/merchantEdit'
import { IRoute } from './__interface'

const Routes : IRoute[] = [
	{
		component: BidEdit,
		path: '/bids/:merchantId/form',
	},
	{
		component: BidsList,
		path: '/bids/:merchantId',
	},
	{
		component: MerchantEditPage,
		path: '/merchant/form/:merchantId',
	},
	{
		component: MerchantEditPage,
		path: '/merchant/form',
	},
	{
		component: HomePage,
		path: '/',
	},
]

export default Routes
