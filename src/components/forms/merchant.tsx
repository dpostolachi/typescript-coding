import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '../common/button'
import { FieldBlock, FieldControl, FieldName } from './fieldControls'
import InputField from './inputField'

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const phoneRegexp = /^[0-9\(\)\-\+\s]*$/i

const emailValidator = ( value: string ) =>
  value && !emailRegexp.test(value) ?
  'Invalid email address' : undefined

const nameValidator = ( value: string ) =>
	value && value.trim().length < 2 ?
	'Invalid name' : undefined

const phoneValidator = ( value: string ) =>
	value && !phoneRegexp.test(value) ?
	'Invalid phone' : undefined

const asyncValidate = ( values: any ) => {
	const { avatarUrl } = values
	return new Promise( ( resolve, reject ) => {
		if( avatarUrl ) {
			const image = new Image()
			image.addEventListener( 'load', ( e ) => {
				return resolve( {} )
			} )
			image.addEventListener( 'error', ( e ) => {
				reject( {
					avatarUrl: 'not a valid image url'
				} )
			} )
			image.src = avatarUrl
		} else {
			resolve( {} )
		}
	} )
}

const MerchantForm = ( props: any ) => {

	const { handleSubmit } = props

	return (
		<form onSubmit={ handleSubmit }>
			<FieldBlock>
				<FieldName>First name</FieldName>
				<FieldControl>
					<Field name='firstName' component={ InputField } validate={ nameValidator } type='text' required={ true } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName>Last name</FieldName>
				<FieldControl>
					<Field name='lastName' component={ InputField } validate={ nameValidator } type='text' required={ true } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName>Email</FieldName>
				<FieldControl>
					<Field name='email' component={ InputField } validate={ emailValidator } type='email' required={ true } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName>Phone</FieldName>
				<FieldControl>
					<Field name='phone' component={ InputField } validate={ phoneValidator } type='phone' required={ true } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName>Avatar Url</FieldName>
				<FieldControl>
					<Field name='avatarUrl' component={ InputField } type='text' required={ false } />
				</FieldControl>
			</FieldBlock>
			<FieldBlock>
				<FieldName />
				<FieldControl>
					<label>
						<Field name='hasPremium' component='input' type='checkbox' />
						premium
					</label>
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
	asyncBlurFields: [ "avatarUrl" ],
	asyncValidate,
	enableReinitialize: true,
	form: 'merchant',
} )( MerchantForm )
