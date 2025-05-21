import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnomaliesByShopId } from "../../../../../reduxToolkit/slices/anomalySlice";
import ShopAnomalyTable from "./ShopAnomalyTable";

export default function ShopAnomaly({id}) {
  const dispatch = useDispatch();
  const anomalies = useSelector(state => state.anomaly.anomalies);
  const loading = useSelector(state => state.anomaly.loading);
  const shops = useSelector(state => state.shops.shops);
  
  // Fetch anomalies when shop selection changes
  useEffect(() => {
    if (id) {
      dispatch(fetchAnomaliesByShopId(id));
    } else {
      // Clear anomalies when no shop is selected
      dispatch({ type: 'anomaly/fetchByShopId/fulfilled', payload: [] });
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--theme-color)]"></div>
      </div>
    );
  }

  const formattedAnomalies = anomalies.map(anomaly => {
    const shop = shops.find(shop => shop.id === anomaly.shop_id);
    return {
      id: anomaly.anomaly_id,
      dateTime: new Date(anomaly.event_recorded_dt).toLocaleString(),
      shopName: shop ? shop.name : `Shop ${anomaly.shop_id}`,
      cameraName: `Camera ${anomaly.camera_id}`,
      detectionType: anomaly.anomaly_type,
      anomalyName: anomaly.anomaly_name,
      videoLink: anomaly.video_link,
      userFeedback: anomaly.feedback,
      correctedLabel: anomaly.modified_by !== anomaly.created_by ? 'Corrected' : 'Unverified'
    };
  });

  return (
      <ShopAnomalyTable anomalies={formattedAnomalies} />
  );
}