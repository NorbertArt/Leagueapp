import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from './routes/RouteUtils'
import routes from './routes/routes'

const App = () => {
	return (
		<>
			
			<Router>
				<Suspense fallback={<p>loading...</p>}>
					{renderRoutes(routes)}
				</Suspense>
			</Router>
		</>
	)
}

export default App
