import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Home, Login, Public } from './pages/public'
import routes from './utils/routes'

function App() {
    return (
        <>
            <div className="flex justify-center items-center">
                <Routes>
                    <Route path={routes.PUBLIC} element={<Public />}>
                        <Route path={routes.HOME} element={<Home />} />
                        <Route path={routes.LOGIN} element={<Login />} />
                    </Route>
                </Routes>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App
