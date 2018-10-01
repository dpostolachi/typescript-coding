import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Button from '../common/button'
import {
	separator
} from '../ui/colors'
import Avatar from './avatar'

const MerchantImage = styled.div`
	display: block;
	width: 90px;
	height: 90px;
	border-radius: 50%;
`

const MerchantDetails = styled.div`
	display: block;
	width: calc( 100% - 90px );
	padding: 0px 0px 0px 12px;
`

const MerchantName = styled.div`
	display: block;
	font-size: 1.8rem;
	margin-bottom: 6px;
`


const MerchantContact = styled.div`
	display: block;
	color: #616161;
	font-size: 1.4rem;
	margin-bottom: 6px;
	.fa{
		margin-right: 6px;
		opacity: .7;
	}
`

const MerchantControls = styled.div`
	display: block;
	margin: 12px 0px;
`

const MerchantContainer = styled<{ hasPremium: boolean }, "div">("div")`
	display: flex;
	border-bottom: 1px solid ${separator};
	padding: 12px 0px;
	${ props => props.hasPremium && css`
		${MerchantName} {
			color: #009688;
		}
		${MerchantImage}{
			box-shadow: 0px 0px 0px 5px #A5D6A7;
		}
		`
	}
`

export default class extends React.PureComponent<any, any>{

	public deleteMerchant = () => {
		const { id, deleteMerchant } = this.props
		return deleteMerchant( id )
	}

	public render() {

		const {
			firstName,
			lastName,
			email,
			phone,
			id,
			hasPremium,
			avatarUrl,
		} = this.props

		const displayName = `${firstName} ${lastName}`

		return (
			<MerchantContainer hasPremium={ hasPremium }>
				<MerchantImage>
					<Avatar title={ displayName } image={ avatarUrl || '/no-img.png' } />
				</MerchantImage>
				<MerchantDetails>
					<MerchantName>{ displayName }</MerchantName>
					<MerchantContact>
						<span className='fa fa-envelope' />
						{ email }
					</MerchantContact>
					<MerchantContact>
						<span className='fa fa-phone' />
						{ phone }
					</MerchantContact>
					<MerchantControls>
						<Link to={ `/merchant/form/${ id }` }>
							<Button><span className='fa fa-pencil' />edit</Button>
						</Link>
						<Button onClick={ this.deleteMerchant }><span className='fa fa-trash' />delete</Button>
						<Link to={ `/bids/${id}` }>
							<Button><span className='fa fa-list' />bids</Button>
						</Link>
					</MerchantControls>
				</MerchantDetails>
			</MerchantContainer>
		)
	}

}
