import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBid, fetchMerchantBids } from '../../actions/bids'
import Bid from '../blocks/bid'
import BidsContainer from '../blocks/dataContainer'
import Heading from '../common/heading'
import LinkButton from '../common/linkButton'
import Placeholder from '../common/placeholder'


const mapStateToProps = ( store: any ) => {

	const { bidList } = store
	return {
		bidList
	}
}

class BidsList extends React.PureComponent<any, any> {

	public static getParams( props: any ) {
		const { match: { params: { merchantId } } } = props
		return {
			merchantId: parseInt( merchantId, 10 )
		}
	}

	constructor( props: any ) {
		super( props )
		const { merchantId } = BidsList.getParams( props )
		props.dispatch( fetchMerchantBids( merchantId ) )
	}

	public deleteBid( bid: number ) {
		return () => {
			return deleteBid( bid )
			.then( () => {
				const { merchantId } = BidsList.getParams( this.props )
				this.props.dispatch( fetchMerchantBids( merchantId ) )
			} )
		}
	}

 	public render () {
		const { merchantId } = BidsList.getParams( this.props )
		const { bidList: { completed, merchant, list } } = this.props
		const empty = list.length === 0
		return (
			<div>
				<Heading>
					{ ( merchant && completed ) ? `${merchant.firstName} ${merchant.lastName}'s bids` : 'Merchant\'s bids'  }
				</Heading>
				<LinkButton link='/' text='back' icon='fa fa-arrow-left'/>
				{
					merchant && <LinkButton link={ `/bids/${ merchantId }/form` } text='add new bid' icon='fa fa-plus'/>
				}
				<BidsContainer loading={ !completed } empty={ empty }>
					{
						( completed ) ? (
							( merchant ) ? (
								( !empty ) ? (
									list.map( ( bid: any, key: number ) => {
										const { id } = bid
										return <Bid { ...bid } deleteBid={ this.deleteBid( id ) } key={ key } />
									} )
								) : (
									<Placeholder>No bids found, <Link to={ `/bids/${ merchantId }/form` }>add one</Link></Placeholder>
								)
							) : (
								<Placeholder>Merchant not found.</Placeholder>
							)
						) : (
							<Placeholder>Loading...</Placeholder>
						)
					}
				</BidsContainer>
			</div>
		)
	}
}

export default connect( mapStateToProps )( BidsList )
