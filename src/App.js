import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Fragment } from 'react'

import { publicRoute } from '~/routes'
import { MainLayout } from '~/components/layouts'

function App() {
    return (
        <Router>
            <Routes>
                {publicRoute.map(({ path, component, layout }, index) => {
                    const Page = component

                    let Layout = MainLayout

                    if (layout) {
                        Layout = layout
                    } else if (layout === null) {
                        Layout = Fragment
                    }

                    return (
                        <Route
                            key={index} path={path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>}
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App;
