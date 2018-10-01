import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { mainColor } from '../ui/colors'

const Paginator = styled.ul`
	display: block;
	padding: 32px 0px;
	text-align: center;
`

const PaginatorItem = styled<{ active: boolean }, "li">("li")`
	display: inline-block;
	margin: 0px 3px;
	> a {
		display: inline-block;
		min-width: 24px;
		height: 2.4rem;
		line-height: 2.4rem;
		padding: 0px 6px;
		border-radius: 50%;
		background: #cdcdcd;
		color: #fff;
		font-size: 1.3rem;
	}
	&:hover > a {
		background: ${mainColor};
	}
	${ props => props.active && css`
		> a {
			background: ${mainColor};
		}
	` }
`

const scrollTop = () => {
	document!.querySelector('body')!.scrollIntoView( {
		behavior: 'smooth',
		block: 'start',
	} )
}

export default ( props: any ) => {
	const { pages, current } = props

	if ( pages > 1 ) {
		const showPages = Array.apply( null, { length: pages } )
		return (
			<Paginator>
				{
					showPages.map( (_ : any, key: number) => {
						const page = key + 1
						return <PaginatorItem key={ page } active={ page === current }>
							<Link onClick={ scrollTop } to={ `?page=${ page }` }>{ page }</Link>
						</PaginatorItem>
					} )
				}
			</Paginator>
		)
	} else {
		return null
	}
}
