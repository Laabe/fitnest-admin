import {columns, Payment} from "./columns"
import {DataTable} from "./data-table"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

export default async function Page() {
    const data = await getData()

    return (
        <div className={"flex min-h-min flex-1 flex-col p-4"}>
            <div className={"mb-2 flex items-baseline justify-between gap-2"}>
                <div>
                    <h2 className={"text-2xl font-bold tracking-tight"}>Meals</h2>
                    <p className={"text-muted-foreground"}>Manage your meals</p>
                </div>
            </div>
            <div className="flex-1">
                <div className="space-y-4">
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
            </div>
        </div>
    )
}