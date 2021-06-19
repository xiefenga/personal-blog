import 'antd/dist/antd.css'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/404'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider as StoreProvider } from './store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

function App() {
	return (
		<ConfigProvider locale={zhCN}>
			<StoreProvider>
				<Router basename="admin">
					<Switch>
						<Route path="/login" component={Login} exact />
						<Route path="/404" component={NotFound} exact />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</StoreProvider>
		</ConfigProvider>
	);
}

export default App