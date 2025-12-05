import CloudProfilesListReducer from "@/store/allCloudProfileList/reducer";
import CloudScanListReducer from "@/store/allCloudScanList/reducer";
import CloudServicesListReducer from "@/store/allCloudServicesList/reducer";
import HeatmapListReducer from "@/store/allHeatmap/reducer";
import ScanFrameworkListReducer from "@/store/allScannedFrameworkList/reducer";
import CommandResultReducer from "@/store/commandResults/reducer";
import UserDetailsReducer from "@/store/userDetails/reducer";
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CustomizerReducer from './customizer/CustomizerSlice';

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
  reducer: {
    customizer: persistReducer(persistConfig, CustomizerReducer),
    UserDetails: UserDetailsReducer,
    CloudProfilesList: CloudProfilesListReducer,
    CloudServicesList: CloudServicesListReducer,
    CloudScanList: CloudScanListReducer,
    HeatmapList: HeatmapListReducer,
    ScanFrameworkList: ScanFrameworkListReducer,
    CommandResult: CommandResultReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store);
