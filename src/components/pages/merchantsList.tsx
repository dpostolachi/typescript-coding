import { parse as qsParse } from 'query-string'
import * as React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteMerchant, fetchMerchants } from '../../actions/merchant'
import MerchantsContainer from '../blocks/dataContainer'
import Merchant from '../blocks/merchant'
import Heading from '../common/heading'
import LinkButton from '../common/linkButton'
import Placeholder from '../common/placeholder'
import Paginator from '../controls/paginator'
import { MerchantsPerPage } from '../ui/settings'

const mapStateToProps = ( store: any ) => {
	const { merchants } = store
	return {
		merchants
	}
}

interface IState {
	count: number,
	list: object[],
	page: number
}

interface ISearchParams {
	page: number,
}

class MerchantList extends React.PureComponent<any,IState> {

    public static getSearchParams(search: string): ISearchParams {
		return {
			page: parseInt( qsParse( search ).page || 1, 10 )
		}
    }

	public static getDerivedStateFromProps( props: any, state: IState ){
		const { location: { search } } = props
		const { page } = MerchantList.getSearchParams( search )

		if ( page !== state.page ) {
			props.dispatch( fetchMerchants( ( page - 1 ) * MerchantsPerPage, MerchantsPerPage ) )
			return ( {
				page,
			} )
		} else {
			return null
		}


	}

	public state: IState;

	constructor( props: any ) {

		super( props )

		const { location: { search } } = props
		const { page } = MerchantList.getSearchParams( search )

		this.state = {
			count: 0,
			list: [],
			page,
		}

	}

	public deleteMerchant = ( merchantId : number ) => {

		this.props.dispatch( deleteMerchant( merchantId ) )
		.then( () => {
			const { location: { search } } = this.props
			const { page } = MerchantList.getSearchParams( search )
			this.props.dispatch( fetchMerchants( ( page - 1 ) * MerchantsPerPage, MerchantsPerPage ) )
		} )
	}

	public componentDidMount(){
		this.props.dispatch( fetchMerchants( ( this.state.page - 1 ) * MerchantsPerPage, MerchantsPerPage ) )
	}

	public render () {
		const { page } = this.state
		const { merchants: { list, count, pending }  } = this.props
		return (
			<div>
				<Heading>Merchant list ({ count })</Heading>
				<LinkButton link='/merchant/form' icon='fa fa-plus' text='add new merchant' />
				<MerchantsContainer empty={ !pending && count === 0 } loading={ pending }>
					{
						list.map( ( merchant: any, key: number ) => {
							return <Merchant deleteMerchant={ this.deleteMerchant } key={ key } { ...merchant } />
						} )
					}
					<Placeholder>No merchants, <Link to='/merchant/form'>add one</Link></Placeholder>
				</MerchantsContainer>
				<Paginator pages={ Math.ceil( count / MerchantsPerPage ) } current={ page } />
			</div>
		)
	}
}

export default connect( mapStateToProps )( MerchantList )
