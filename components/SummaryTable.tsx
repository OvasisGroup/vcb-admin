import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Invoices {
    No: string;
    FirstName: string;
    LastName: string;
    Email: string;
}

// Function to get initials
const getInitials = (user: Partial<Invoices>): string => {
    const firstInitial = user.FirstName?.charAt(0).toUpperCase() || '';
    const lastInitial = user.LastName?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`.trim();
};

const invoices: Invoices[] = [
    {
        No: "ERICK0",
        FirstName: "Erick",
        LastName: "Ayara",
        Email: "ayaraerick@gmail.com",
    },
    {
        No: "OVASIS",
        FirstName: "Ovasis",
        LastName: "Media",
        Email: "ovasisgroup@gmail.com",
    },
    {
        No: "VICTOR",
        FirstName: "Victor",
        LastName: "Owuor",
        Email: "ayaraerick@gmail.com",
    },
    {
        No: "ERICK0",
        FirstName: "Erick",
        LastName: "Ayara",
        Email: "ayaraerick@gmail.com",
    },
    {
        No: "ERICK0",
        FirstName: "Erick",
        LastName: "Ayara",
        Email: "ayaraerick@gmail.com",
    },

]



export function SummaryTable() {
    return (
        <>
            <Table className="overflow-hidden">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow className="text-vcblue">
                        <TableHead className="text-vcblue font-black">#</TableHead>
                        <TableHead className="w-[100px] font-black text-vcblue">First Name</TableHead>
                        <TableHead className="text-vcblue font-black">Last Name</TableHead>
                        <TableHead className="font-black text-vcblue">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.No}>
                            <TableCell className=" text-vcblue bg-gray-200">{getInitials(invoice)}</TableCell>
                            <TableCell className="font-medium">{invoice.FirstName}</TableCell>
                            <TableCell>{invoice.LastName}</TableCell>
                            <TableCell>{invoice.Email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        {/* <TableCell colSpan={3}>See All</TableCell> */}
                        {/* <TableCell className="text-right">$2,500.00</TableCell> */}
                    </TableRow>
                </TableFooter>
            </Table>
            See all
        </>
    )
}
