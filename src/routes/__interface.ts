import { ComponentClass, StatelessComponent } from 'react'

export interface IRoute {
	path: string
	exact?: boolean
	component: ComponentClass | StatelessComponent | any
}
