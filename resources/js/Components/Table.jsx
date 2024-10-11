export default function Table({ className = "", data = [] }) {
    // If data is empty, we return a simple message or an empty table
    if (!data.length) {
        return <div>No data available</div>;
    }

    // Extract headers from the keys of the first data object
    const headers = Object.keys(data[0]);

    return (
        <div className="table-responsive">
            <table className={className}>
                <thead className="thead-light">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="text-uppercase">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, cellIndex) => (
                                <td key={cellIndex}>{row[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
