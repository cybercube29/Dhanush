import { Card, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export function TableSkeleton({ rows = 5, cols = 6 }) {
    return (
        <Card sx={{ p: 1}}> 
            <Table>
                <TableHead>
                    <TableRow>
                        {Array.from({ length: cols }).map((_, i) => (
                            <TableCell key={i}><Skeleton variant="text" width={80} /></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rows }).map((_, r) => (
                        <TableRow key={r}>
                            {Array.from({ length: cols }).map((_, c) => (
                                <TableCell key={c}>
                                    <Skeleton variant="text" width={60 + 10 * c} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
