import { configureStore } from "@reduxjs/toolkit";
import paymentsReducer from "./slices/paymentSlice";
import shopsReducer from "./slices/shopSlice"
import anomalyReducer from './slices/anomalySlice'
import subscriptionReducer from './slices/subscriptionSlice'
import visitorReducer from './slices/visitorsSlice'
import ticketsReducer from './slices/ticketSlice'
import authReducer from './slices/authSlice'
import cameraReducer from './slices/cameraSlice'
import edgeDeviceReducer from './slices/edgeDeviceSlice' 

const store = configureStore({
    reducer: {
        payments: paymentsReducer,
        shops: shopsReducer,
        anomaly: anomalyReducer,
        subscription: subscriptionReducer,
        visitor: visitorReducer,
        tickets: ticketsReducer,
        auth: authReducer,
        cameras: cameraReducer,
        edgeDevice: edgeDeviceReducer
    }
});

export default store;