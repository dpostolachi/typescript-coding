import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '../common/button'
import { FieldBlock, FieldControl, FieldName } from './fieldControls'
import InputField from './inputField'

const numberRegex = /^[0-9]*$/

const nameValidator = ( value: string ) =>
	value && value.trim().length < 2 ?
	'Invalid name' : undefined

const amoutValidator = ( value: string ) =>
	value && !numberRegex.test( value ) ? 'Not a valid number'
	: undefined

const BidForm = ( props: any ) => {

	const { handleSubmit } = props

	return (
		<form onSubmit={ handleSubmit }>
			<FieldBlock>
				<FieldName>Car Title</FieldName>
				<FieldControl>
					<Field name='carTitle' component={ InputField } validate={ nameValidator } type='text' required={ true } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName>Amount</FieldName>
				<FieldControl>
					<Field name='amount' component={ InputField } validate={ amoutValidator } type='number' required={ true } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName />
				<FieldControl>
					<Button type='submit'>Send</Button>
				</FieldControl>
			</FieldBlock>
		</form>
	)
}

export default reduxForm( {
	enableReinitialize: true,
	form: 'bid',
} )( BidForm )
