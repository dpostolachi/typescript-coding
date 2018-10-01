import * as moment from 'moment'
import * as React from 'react'
import styled from 'styled-components'
import IconButton from '../common/iconButton'
import { separator } from '../ui/colors'

const BidContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 0px;
	border-bottom: 1px solid ${separator};
`

const BidField = styled.div`
	display: block;
	text-align: center;
`
const BidFieldName = styled.div`
	display: block;
	font-size: 1.3rem;
	color: #cdcdcd;
	line-height: 2rem;
`
const BidFieldValue = styled.div`
	display: block;
	font-size: 1.5rem;
`

export default ( props: any ) => {
	const { amount, carTitle, dateCreated, deleteBid } = props
	return (
		<BidContainer>
			<BidField>
				<BidFieldName>car title:</BidFieldName>
				<BidFieldValue>{ carTitle }</BidFieldValue>
			</BidField>
			<BidField>
				<BidFieldName>amount:</BidFieldName>
				<BidFieldValue>{ amount }</BidFieldValue>
			</BidField>
			<BidField>
				<BidFieldName>date created:</BidFieldName>
				<BidFieldValue>{ moment( dateCreated).format(' DD MMM YYYY HH:mm') }</BidFieldValue>
			</BidField>
			<BidField>
				<BidFieldName>delete</BidFieldName>
				<BidFieldValue>
					<IconButton type='button' onClick={ deleteBid }>
						<span className='fa fa-trash' />
					</IconButton>
				</BidFieldValue>
			</BidField>
		</BidContainer>
	)
}
