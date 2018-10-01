import styled, { css } from 'styled-components'
import Placeholder from '../common/placeholder'

export default styled<{ loading: boolean, empty: boolean }, "div">("div")`
	display: block;
	position: relative;
	opacity: 1;
	${ Placeholder } {
		display: none;
	}
	&:before{
		content: '';
	}
	${ props => props.loading && !props.empty && css`
		opacity: .5;
	` }
	${ props => props.empty && css`
		min-height: 200px;
		line-height: 200px;
		text-align: center;
		background: #cdcdcd;
		${ Placeholder } {
			display: inline-block;
		}
	` }
`
