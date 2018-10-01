import styled from 'styled-components'

export const FieldBlock = styled.div`
	display: flex;
	margin-bottom: 12px;
	line-height: 32px;
`
export const FieldName = styled.label`
	display: inline-block;
	vertical-align: middle;
	width: 120px;
	text-align: right;
	padding-right: 12px;
	color: #919191;
	font-weight: normal;
	font-size: 1.3rem;
`
export const FieldControl = styled.div`
	display: block;
	width: calc( 100% - 120px );
	input[type="text"],
	input[type="number"],
	input[type="phone"],
	input[type="email"]{
		display: inline-block;
		vertical-align: middle;
		height: 32px;
		width: 200px;
		position: relative;
		max-width: 100%;
		border-radius: 3px;
		border: 1px solid #9E9E9E;
		padding: 0px 12px;
		&:focus{
			border: 1px solid #757575;
		}
	}
	input[type="checkbox"]{
		margin-right: 6px;
	}
`
