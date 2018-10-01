import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import * as React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/layout'
import routes from './routes'
import Store from './store'

class App extends React.Component<any, any> {
    public render() {
        return (
            <Provider store={ Store }>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            { routes.map( ( route, key ) => {
                                const { path, component } = route
                                return <Route path={ path } key={ key } component={ component } />
                            } ) }
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
