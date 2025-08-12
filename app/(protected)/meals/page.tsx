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
                <div className="flex flex-wrap justify-end gap-2">
                    <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                         rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1
                          focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                           [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0
                            bg-green-900 text-primary-foreground shadow-sm hover:bg-green-800 h-9
                             px-4 py-2 font-semibold">Create
                        Task
                    </button>
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