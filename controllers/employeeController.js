const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.Employee.findMany();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    const { empID } = req.params; // Get empID from the request parameters
    try {
        const employee = await prisma.Employee.findUnique({
            where: { empID: empID }, // Ensure this matches your database schema
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee); // Return the employee data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
};

module.exports={getEmployees, getEmployeeById};