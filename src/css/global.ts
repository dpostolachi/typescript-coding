import { injectGlobal } from 'styled-components'
import { textColor } from '../components/ui/colors'

export default () => {
	return injectGlobal`
		*{
			box-sizing: border-box;
			transition: .2s all ease-in-out;
		}
		*:hover,*:focus{
			transition: .2s all ease-in-out;
		}
		*:focus{
			outline: none;
		}
		body {
			font-family: sans-serif;
			background: #edeef0;
			font-size: 1.6rem;
			color: ${textColor};
		}
		html {
			font-size: 62.5%;
		}
		a {
			text-decoration: none;
		}
	`
}
