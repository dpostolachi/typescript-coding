import * as React from 'react'
import styled from 'styled-components'

const Error = styled.span`
	display: block;
	color: red;
	font-size: 1.3rem;
	color: #EF5350;
`

export default ( props: any ) => {
	const { input, label, type, meta: { touched, error, warning }, required = false } = props
	return (
		<React.Fragment>
			<input { ...input } placeholder={ label } type={ type } required={ required } />
			{touched && ((error && <Error>{error}</Error>) || (warning && <span>{warning}</span>))}
		</React.Fragment>
	)
}
