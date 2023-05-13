import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as homeAction from './store/actions/homeAction'
import routes from './utils/routes'
import { Home, Login, Public, Album } from './pages/public'

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(homeAction.getHome())
    }, [])

    return (
        <>
            <div className="w-full min-h-screen flex justify-center bg-[#170f23] overflow-y-auto">
                <Routes>
                    <Route path={routes.PUBLIC} element={<Public />}>
                        <Route path={routes.HOME} element={<Home />} />
                        <Route path={routes.LOGIN} element={<Login />} />
                        <Route path={routes.ALBUM_TITLE_ID} element={<Album />} />
                        <Route path={routes.PLAYLIST_TITLE_ID} element={<Album />} />
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
