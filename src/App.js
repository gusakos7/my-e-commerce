import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import {
  createUserDocument,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) await createUserDocument(user).catch((e) => console.log(e));
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
