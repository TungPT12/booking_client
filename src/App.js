import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Transaction from "./pages/Transaction/Transaction";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { checkAccessToken } from "./apis/authn";
import { authnAction } from "./stores/slice/authn";
const clientRouters = [
  {
    name: "Home",
    path: '/',
    element: <>
      <Navbar />
      <Home />
    </>

  },
  {
    name: "Search",
    path: '/search',
    element: <>
      <Navbar />
      <Search />
    </>

  },
  {
    name: "Detail",
    path: '/detail/:id',
    element: <>
      <Navbar />
      <Detail />
    </>

  },
  {
    name: "Transaction",
    path: '/transaction',
    element: <>
      <Navbar />
      <Transaction />
    </>

  },
  // {
  //   name: "MatchAll",
  //   path: '*',
  //   element: <ErrorComponent />

  // },
]

function App() {
  // const { isAuthn, isAdmin, username, email, avatar } = useSelector(state => state.authn);
  const dispatch = useDispatch();
  const renderRouter = (listRouter) => {
    return listRouter.map((router) => {
      return <Route key={router.path} path={router.path} element={router.element} />
    })
  }
  useEffect(() => {
    const token = localStorage.getItem('bookingToken');
    if (!token) {
      return;
    }
    checkAccessToken(token).then((response) => {
      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem('bookingToken');
        window.location.href = '/login'
      }
      if (response.status !== 200) {
        localStorage.removeItem('bookingToken');
        throw new Error('Something wrong');
      }
      dispatch(authnAction.setUser(response.data));
    }).catch((error) => {
      console.log(error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        {renderRouter(clientRouters)}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

