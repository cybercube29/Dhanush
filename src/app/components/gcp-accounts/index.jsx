import AssetManagement from "../asset-management";

export default function GCPAssets() {
    return <AssetManagement allowedClouds={['gcp']} showAddButton={false} />;
}
