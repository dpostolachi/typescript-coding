import { ComponentClass, StatelessComponent } from 'react'
import BidEdit from '../components/pages/bidEdit'
import BidsList from '../components/pages/bids'
import MerchantEditPage from '../components/pages/merchantEdit'
import MerchantsList from '../components/pages/merchantsList'

export interface IRoute {
	path: string
	exact?: boolean
	component: ComponentClass | StatelessComponent | any
}

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
		component: MerchantsList,
		path: '/',
	},
]

export default Routes
