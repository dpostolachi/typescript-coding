import * as React from 'react'
import { connect } from 'react-redux'
import { resetFormStatus, submitBid, testMerchant } from '../../actions/bids'
import DataContainer from '../blocks/dataContainer'
import Heading from '../common/heading'
import Label from '../common/label'
import LinkButton from '../common/linkButton'
import Placeholder from '../common/placeholder'
import BidForm from '../forms/bid'

const mapStateToProps = ( store: any ) => {

	const { bidEdit } = store

	return {
		bidEdit,
	}

}

class BidEditPage extends React.PureComponent<any, any> {

	public static getParams( props: any ) : any {
		const { match: { params: { merchantId } } } = props
		return {
			merchantId: ( merchantId ) ? parseInt( merchantId, 10 ) : null
		}
	}

	constructor( props: any ) {
		super( props )
		const { merchantId } = BidEditPage.getParams( props )
		props.dispatch( testMerchant( merchantId ) )
	}

	public handleSubmit = ( data: any ) => {

		const { merchantId } = BidEditPage.getParams( this.props )

		this.props.dispatch( submitBid( {
			...data,
			merchantId,
		} ) )

	}

	public componentWillUnmount() {
		this.props.dispatch( resetFormStatus() )
	}

	public render() {

		const { bidEdit: { pending, merchantExists, status  } } = this.props
		const { merchantId } = BidEditPage.getParams( this.props )
		return (
			<div>
				<Heading>
					New Bid
				</Heading>
				{
					merchantExists &&  <LinkButton link={ `/bids/${merchantId}` } text='back'  icon='fa fa-arrow-left' />
				}
				{
					( !merchantExists || pending ) ? (
							<DataContainer loading={ false } empty={ true }>
							{
								!merchantExists && (
									<Placeholder>Merchant not found.</Placeholder>
								)
							}
							{
								pending && (
									<Placeholder>Loading...</Placeholder>
								)
							}
						</DataContainer>
					) : (
						<BidForm onSubmit={ this.handleSubmit } />
					)
				}
				{
					status && <Label status={ status }>
						{
							( status === 'SUCCESS' ) ? 'bid has been saved.' :
								'failed to save bid'
						}
					</Label>
				}
			</div>
		)

	}
}

export default connect( mapStateToProps )( BidEditPage )
