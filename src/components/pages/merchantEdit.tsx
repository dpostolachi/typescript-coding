import * as React from 'react'
import { connect } from 'react-redux'
import { fetchMerchantsEdit, resetFormStatus, resetMerchantEdit, submitMerchant } from '../../actions/merchant'
import DataContainer from '../blocks/dataContainer'
import Heading from '../common/heading'
import Label from '../common/label'
import LinkButton from '../common/linkButton'
import Placeholder from '../common/placeholder'
import MerchantForm from '../forms/merchant'

const mapStateToProps = ( store: any ) => {

	const { merchantEdit } = store

	return {
		merchantEdit,
	}

}

interface IState {
	merchantId: number | null,
}

class MerchantEditPage extends React.PureComponent<any, any> {

	public static getParams( props: any ) : any {
		const { match: { params: { merchantId } } } = props
		return {
			merchantId: ( merchantId ) ? parseInt( merchantId, 10 ) : null
		}
	}

	public state: IState;

	constructor( props: any ){

		super( props )

		const { merchantId } = MerchantEditPage.getParams( props )
		const { merchantEdit: { pending, completed } } = props

		if ( !pending && !completed && merchantId ) {
			props.dispatch( fetchMerchantsEdit( merchantId ) )
		}

	}

	public componentWillUnmount() {
		this.props.dispatch( resetMerchantEdit() )
		this.props.dispatch( resetFormStatus() )
	}


	public handleSubmit = ( data: any ) => {
		this.props.dispatch( submitMerchant( data ) )
	}

	public render() {

		const { merchantEdit: { current, completed, status } } = this.props
		const { merchantId } = MerchantEditPage.getParams( this.props )

		return (
			<div>
				<Heading>{ ( current && current.id ) ? 'Edit' : 'New' } merchant</Heading>
				<LinkButton link='/' text='back' icon='fa fa-arrow-left' />
				{
					( merchantId && !completed ) ? (
						<DataContainer loading={ true } empty={ true }>
							<Placeholder>Loading...</Placeholder>
						</DataContainer>
					) : (
						<MerchantForm initialValues={ current || {} } onSubmit={ this.handleSubmit } />
					)
				}
				{
					status && <Label status={ status }>
						{
							( status === 'SUCCESS' ) ? 'merchant has been saved.' :
								'failed to save merchant'
						}
					</Label>
				}
			</div>
		)
	}
}

export default connect( mapStateToProps )( MerchantEditPage )
