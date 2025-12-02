import { createStore,applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducers";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'main-root',
    storage,
}

const PersistedReducer=persistReducer(persistConfig,rootReducer);

const reduxStore = createStore(PersistedReducer,applyMiddleware());

const Persistor=persistStore(reduxStore);

export{Persistor};
export default reduxStore;