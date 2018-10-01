import styled, { css } from 'styled-components'


export default styled<{ status: string | null }, "span">("span")`
	display: inline-block;
	font-size: 1.4rem;
	padding: 0px 12px;
	line-height 2rem;
	color: #fff;
	border-radius: 3px;
	border: 1px solid;
	${ props => props.status === 'SUCCESS' && css`
		background-color: #81C784;
		border-color: #388E3C;
	` }
	${ props => props.status === 'ERROR' && css`
		background-color: #EF5350;
		border-color: #D32F2F;
	` }
`
