import AdvancedTable from '../shared/AdvancedTable';
import TableCustomCard from '../shared/TableCustomCard';

export default function AssetTableCard({ title, data, columns, onRefresh, handleToggleAssets }) {
  return (
    <TableCustomCard title={title} refreshTableData={onRefresh} addData={handleToggleAssets}>
      {({ searchQuery }) => (
        <AdvancedTable
          tableData={data}
          columns={columns}
          searchQuery={searchQuery}
        />
      )}
    </TableCustomCard>
  );
}