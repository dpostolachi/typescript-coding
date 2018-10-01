import * as React from 'react';
import styled from 'styled-components'
import Container from '../common/container'
import Header from '../controls/header'

const Content = styled(Container)`
	border-radius: 2px;
	background: #fff;
	box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
`

export default ( props: any ) => {
	return (
		<React.Fragment>
			<Header />
			<Content>
				{ props.children }
			</Content>
		</React.Fragment>
	)

}
